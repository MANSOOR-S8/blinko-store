import { Request, Response } from "express";
import mongoose from "mongoose";
import Order, { OrderStatus } from "../models/Order.model";
import Cart from "../models/Cart.model";
import Product from "../models/Product.model";
import Coupon from "../models/Coupon.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { calculateOrderTotals } from "../utils/pricing";

export const placeOrder = asyncHandler(async (req: Request, res: Response) => {
  const { shippingAddress, paymentMethod, couponCode } = req.body;
  if (!shippingAddress || !paymentMethod) {
    throw new ApiError(400, "shippingAddress and paymentMethod are required.");
  }

  const cart = await Cart.findOne({ user: req.user!.id }).populate(
    "items.product",
  );
  if (!cart || cart.items.length === 0)
    throw new ApiError(400, "Your cart is empty.");

  // Verify stock and build order items
  const orderItems: any[] = [];
  for (const item of cart.items) {
    const product = item.product as any;
    if (!product || !product.isActive)
      throw new ApiError(400, `A product in your cart is no longer available.`);
    if (product.stock < item.quantity) {
      throw new ApiError(
        400,
        `Not enough stock for "${product.name}". Only ${product.stock} left.`,
      );
    }
    orderItems.push({
      product: product._id,
      name: product.name,
      image: product.thumbnail,
      price: item.priceAtAdd,
      quantity: item.quantity,
      size: item.size,
      color: item.color,
    });
  }

  let coupon: any = null;
  if (couponCode) {
    coupon = await Coupon.findOne({
      code: couponCode.toUpperCase(),
      isActive: true,
    });
    if (!coupon) throw new ApiError(404, "Invalid coupon code.");
    if (coupon.expiresAt < new Date())
      throw new ApiError(400, "This coupon has expired.");
    if (coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit) {
      throw new ApiError(400, "This coupon has reached its usage limit.");
    }
  }

  const totals = calculateOrderTotals(
    orderItems.map((i) => ({ price: i.price, quantity: i.quantity })),
    coupon,
  );

  const session = await mongoose.startSession();
  let order;
  try {
    await session.withTransaction(async () => {
      order = (
        await Order.create(
          [
            {
              user: req.user!.id,
              items: orderItems,
              shippingAddress,
              paymentMethod,
              couponCode: coupon?.code,
              ...totals,
              paymentStatus: paymentMethod === "cod" ? "pending" : "pending",
            },
          ],
          { session },
        )
      )[0];

      for (const item of orderItems) {
        await Product.findByIdAndUpdate(
          item.product,
          { $inc: { stock: -item.quantity } },
          { session },
        );
      }
      if (coupon) {
        await Coupon.findByIdAndUpdate(
          coupon._id,
          { $inc: { usedCount: 1 } },
          { session },
        );
      }
      cart.items = [] as any;
      await cart.save({ session });
    });
  } finally {
    await session.endSession();
  }

  res
    .status(201)
    .json({
      success: true,
      message: "Order placed successfully.",
      data: { order },
    });
});

export const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await Order.find({ user: req.user!.id }).sort("-createdAt");
  res.status(200).json({ success: true, data: { orders } });
});

export const getOrderById = asyncHandler(
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email",
    );
    if (!order) throw new ApiError(404, "Order not found.");
    const isOwner = order.user._id.toString() === req.user!.id;
    if (!isOwner && req.user!.role !== "admin")
      throw new ApiError(403, "Access denied.");
    res.status(200).json({ success: true, data: { order } });
  },
);

export const cancelOrder = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id);
  if (!order) throw new ApiError(404, "Order not found.");
  const isOwner = order.user.toString() === req.user!.id;
  if (!isOwner && req.user!.role !== "admin")
    throw new ApiError(403, "Access denied.");
  if (["shipped", "delivered", "cancelled"].includes(order.status)) {
    throw new ApiError(
      400,
      `Order cannot be cancelled once it is ${order.status}.`,
    );
  }

  order.status = "cancelled";
  order.cancelledAt = new Date();
  order.statusHistory.push({ status: "cancelled", changedAt: new Date() });
  await order.save();

  // Restock items
  for (const item of order.items) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: item.quantity },
    });
  }

  res
    .status(200)
    .json({ success: true, message: "Order cancelled.", data: { order } });
});

// --- Admin ---

export const getAllOrders = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      status,
      page = "1",
      limit = "20",
    } = req.query as Record<string, string>;
    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));

    const [orders, total] = await Promise.all([
      Order.find(filter)
        .populate("user", "name email")
        .sort("-createdAt")
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      Order.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: {
        orders,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum),
        },
      },
    });
  },
);

const VALID_STATUSES: OrderStatus[] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export const updateOrderStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { status } = req.body;
    if (!VALID_STATUSES.includes(status))
      throw new ApiError(400, "Invalid status value.");

    const order = await Order.findById(req.params.id);
    if (!order) throw new ApiError(404, "Order not found.");

    order.status = status;
    order.statusHistory.push({ status, changedAt: new Date() });
    if (status === "delivered") {
      order.deliveredAt = new Date();
      order.paymentStatus =
        order.paymentMethod === "cod" ? "paid" : order.paymentStatus;
    }
    if (status === "cancelled") {
      order.cancelledAt = new Date();
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: item.quantity },
        });
      }
    }
    await order.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Order status updated.",
        data: { order },
      });
  },
);
