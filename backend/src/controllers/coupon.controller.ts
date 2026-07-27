import { Request, Response } from "express";
import Coupon from "../models/Coupon.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { calculateCouponDiscount } from "../utils/pricing";

export const getCoupons = asyncHandler(async (_req: Request, res: Response) => {
  const coupons = await Coupon.find().sort("-createdAt");
  res.status(200).json({ success: true, data: { coupons } });
});

export const createCoupon = asyncHandler(async (req: Request, res: Response) => {
  const coupon = await Coupon.create({ ...req.body, code: req.body.code?.toUpperCase() });
  res.status(201).json({ success: true, message: "Coupon created.", data: { coupon } });
});

export const updateCoupon = asyncHandler(async (req: Request, res: Response) => {
  const body = { ...req.body };
  if (body.code) body.code = body.code.toUpperCase();
  const coupon = await Coupon.findByIdAndUpdate(req.params.id, body, {
    new: true,
    runValidators: true,
  });
  if (!coupon) throw new ApiError(404, "Coupon not found.");
  res.status(200).json({ success: true, message: "Coupon updated.", data: { coupon } });
});

export const deleteCoupon = asyncHandler(async (req: Request, res: Response) => {
  const coupon = await Coupon.findByIdAndDelete(req.params.id);
  if (!coupon) throw new ApiError(404, "Coupon not found.");
  res.status(200).json({ success: true, message: "Coupon deleted." });
});

// Validates a coupon against a given cart subtotal and returns the discount, without redeeming it.
export const validateCoupon = asyncHandler(async (req: Request, res: Response) => {
  const { code, itemsPrice } = req.body;
  if (!code || typeof itemsPrice !== "number") {
    throw new ApiError(400, "code and itemsPrice are required.");
  }

  const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });
  if (!coupon) throw new ApiError(404, "Invalid coupon code.");
  if (coupon.expiresAt < new Date()) throw new ApiError(400, "This coupon has expired.");
  if (coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit) {
    throw new ApiError(400, "This coupon has reached its usage limit.");
  }
  if (itemsPrice < coupon.minOrderAmount) {
    throw new ApiError(400, `Minimum order amount for this coupon is $${coupon.minOrderAmount}.`);
  }

  const discountAmount = calculateCouponDiscount(itemsPrice, coupon);
  res.status(200).json({
    success: true,
    data: { coupon: { code: coupon.code, type: coupon.type, value: coupon.value }, discountAmount },
  });
});
