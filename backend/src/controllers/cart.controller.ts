import { Request, Response } from "express";
import Cart from "../models/Cart.model";
import Product from "../models/Product.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

async function getOrCreateCart(userId: string) {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  return cart;
}

export const getCart = asyncHandler(async (req: Request, res: Response) => {
  const cart = await getOrCreateCart(req.user!.id);
  await cart.populate("items.product", "name slug price salePrice thumbnail stock");
  res.status(200).json({ success: true, data: { cart } });
});

export const addToCart = asyncHandler(async (req: Request, res: Response) => {
  const { productId, quantity = 1, size, color } = req.body;
  if (!productId) throw new ApiError(400, "productId is required.");

  const product = await Product.findById(productId);
  if (!product || !product.isActive) throw new ApiError(404, "Product not found.");
  if (product.stock < quantity) throw new ApiError(400, "Not enough stock available.");

  const cart = await getOrCreateCart(req.user!.id);
  const price = product.salePrice ?? product.price;

  const existing = cart.items.find(
    (i) =>
      i.product.toString() === productId &&
      (i.size ?? "") === (size ?? "") &&
      (i.color ?? "") === (color ?? ""),
  );

  if (existing) {
    existing.quantity += Number(quantity);
  } else {
    cart.items.push({ product: product._id, quantity: Number(quantity), size, color, priceAtAdd: price } as any);
  }

  await cart.save();
  await cart.populate("items.product", "name slug price salePrice thumbnail stock");
  res.status(200).json({ success: true, message: "Item added to cart.", data: { cart } });
});

export const updateCartItem = asyncHandler(async (req: Request, res: Response) => {
  const { itemId } = req.params;
  const { quantity } = req.body;
  if (typeof quantity !== "number" || quantity < 1) {
    throw new ApiError(400, "quantity must be a positive number.");
  }

  const cart = await getOrCreateCart(req.user!.id);
  const item = cart.items.find((i: any) => i._id.toString() === itemId);
  if (!item) throw new ApiError(404, "Cart item not found.");

  const product = await Product.findById(item.product);
  if (product && product.stock < quantity) throw new ApiError(400, "Not enough stock available.");

  item.quantity = quantity;
  await cart.save();
  await cart.populate("items.product", "name slug price salePrice thumbnail stock");
  res.status(200).json({ success: true, message: "Cart updated.", data: { cart } });
});

export const removeCartItem = asyncHandler(async (req: Request, res: Response) => {
  const { itemId } = req.params;
  const cart = await getOrCreateCart(req.user!.id);
  cart.items = cart.items.filter((i: any) => i._id.toString() !== itemId) as any;
  await cart.save();
  await cart.populate("items.product", "name slug price salePrice thumbnail stock");
  res.status(200).json({ success: true, message: "Item removed.", data: { cart } });
});

export const clearCart = asyncHandler(async (req: Request, res: Response) => {
  const cart = await getOrCreateCart(req.user!.id);
  cart.items = [] as any;
  await cart.save();
  res.status(200).json({ success: true, message: "Cart cleared.", data: { cart } });
});
