import { Request, Response } from "express";
import Wishlist from "../models/Wishlist.model";
import Product from "../models/Product.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

async function getOrCreateWishlist(userId: string) {
  let wishlist = await Wishlist.findOne({ user: userId });
  if (!wishlist) wishlist = await Wishlist.create({ user: userId, products: [] });
  return wishlist;
}

export const getWishlist = asyncHandler(async (req: Request, res: Response) => {
  const wishlist = await getOrCreateWishlist(req.user!.id);
  await wishlist.populate("products", "name slug price salePrice thumbnail stock ratingsAverage");
  res.status(200).json({ success: true, data: { wishlist } });
});

export const addToWishlist = asyncHandler(async (req: Request, res: Response) => {
  const { productId } = req.body;
  if (!productId) throw new ApiError(400, "productId is required.");
  const product = await Product.findById(productId);
  if (!product) throw new ApiError(404, "Product not found.");

  const wishlist = await getOrCreateWishlist(req.user!.id);
  if (!wishlist.products.some((p) => p.toString() === productId)) {
    wishlist.products.push(product._id as any);
    await wishlist.save();
  }
  await wishlist.populate("products", "name slug price salePrice thumbnail stock ratingsAverage");
  res.status(200).json({ success: true, message: "Added to wishlist.", data: { wishlist } });
});

export const removeFromWishlist = asyncHandler(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const wishlist = await getOrCreateWishlist(req.user!.id);
  wishlist.products = wishlist.products.filter((p) => p.toString() !== productId) as any;
  await wishlist.save();
  await wishlist.populate("products", "name slug price salePrice thumbnail stock ratingsAverage");
  res.status(200).json({ success: true, message: "Removed from wishlist.", data: { wishlist } });
});
