import { Request, Response } from "express";
import User from "../models/User.model";
import Product from "../models/Product.model";
import Order from "../models/Order.model";
import { asyncHandler } from "../utils/asyncHandler";

export const getDashboardStats = asyncHandler(async (_req: Request, res: Response) => {
  const [totalUsers, totalProducts, totalOrders, revenueAgg, recentOrders, lowStockProducts] =
    await Promise.all([
      User.countDocuments({ role: "user" }),
      Product.countDocuments(),
      Order.countDocuments(),
      Order.aggregate([
        { $match: { paymentStatus: "paid" } },
        { $group: { _id: null, total: { $sum: "$totalPrice" } } },
      ]),
      Order.find().populate("user", "name email").sort("-createdAt").limit(5),
      Product.find({ stock: { $lte: 5 }, isActive: true }).select("name stock sku").limit(10),
    ]);

  const totalRevenue = revenueAgg[0]?.total || 0;

  res.status(200).json({
    success: true,
    data: {
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      recentOrders,
      lowStockProducts,
    },
  });
});

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const { page = "1", limit = "20" } = req.query as Record<string, string>;
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));

  const [users, total] = await Promise.all([
    User.find().sort("-createdAt").skip((pageNum - 1) * limitNum).limit(limitNum),
    User.countDocuments(),
  ]);

  res.status(200).json({
    success: true,
    data: { users, pagination: { total, page: pageNum, limit: limitNum, totalPages: Math.ceil(total / limitNum) } },
  });
});
