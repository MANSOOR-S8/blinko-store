import { Request, Response } from "express";
import { Types } from "mongoose";
import Review from "../models/Review.model";
import Product from "../models/Product.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

async function recalculateProductRating(productId: string) {
  const stats = await Review.aggregate([
    { $match: { product: new Types.ObjectId(productId) } },
    { $group: { _id: "$product", avg: { $avg: "$rating" }, count: { $sum: 1 } } },
  ]);
  const { avg = 0, count = 0 } = stats[0] || {};
  await Product.findByIdAndUpdate(productId, {
    ratingsAverage: Math.round(avg * 10) / 10,
    ratingsCount: count,
  });
}

export const getProductReviews = asyncHandler(async (req: Request, res: Response) => {
  const reviews = await Review.find({ product: req.params.productId })
    .populate("user", "name avatar")
    .sort("-createdAt");
  res.status(200).json({ success: true, data: { reviews } });
});

export const createReview = asyncHandler(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const { rating, title, comment } = req.body;
  if (!rating || !comment) throw new ApiError(400, "rating and comment are required.");

  const product = await Product.findById(productId);
  if (!product) throw new ApiError(404, "Product not found.");

  const existing = await Review.findOne({ product: productId, user: req.user!.id });
  if (existing) throw new ApiError(409, "You have already reviewed this product.");

  const review = await Review.create({
    product: productId,
    user: req.user!.id,
    rating,
    title,
    comment,
  });
  await recalculateProductRating(productId);
  res.status(201).json({ success: true, message: "Review added.", data: { review } });
});

export const updateReview = asyncHandler(async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId, user: req.user!.id });
  if (!review) throw new ApiError(404, "Review not found.");

  if (req.body.rating) review.rating = req.body.rating;
  if (req.body.title !== undefined) review.title = req.body.title;
  if (req.body.comment) review.comment = req.body.comment;
  await review.save();
  await recalculateProductRating(review.product.toString());

  res.status(200).json({ success: true, message: "Review updated.", data: { review } });
});

export const deleteReview = asyncHandler(async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  const isAdmin = req.user!.role === "admin";
  const review = await Review.findOne(isAdmin ? { _id: reviewId } : { _id: reviewId, user: req.user!.id });
  if (!review) throw new ApiError(404, "Review not found.");

  const productId = review.product.toString();
  await review.deleteOne();
  await recalculateProductRating(productId);

  res.status(200).json({ success: true, message: "Review deleted." });
});
