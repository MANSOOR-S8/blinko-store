import { Request, Response } from "express";
import Brand from "../models/Brand.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { generateSlug } from "../utils/generateSlug";

export const getBrands = asyncHandler(async (_req: Request, res: Response) => {
  const brands = await Brand.find({ isActive: true }).sort("name");
  res.status(200).json({ success: true, data: { brands } });
});

export const getBrandBySlugOrId = asyncHandler(async (req: Request, res: Response) => {
  const { idOrSlug } = req.params;
  const query = idOrSlug.match(/^[0-9a-fA-F]{24}$/) ? { _id: idOrSlug } : { slug: idOrSlug };
  const brand = await Brand.findOne(query);
  if (!brand) throw new ApiError(404, "Brand not found.");
  res.status(200).json({ success: true, data: { brand } });
});

export const createBrand = asyncHandler(async (req: Request, res: Response) => {
  const slug = req.body.slug ? generateSlug(req.body.slug) : generateSlug(req.body.name);
  const brand = await Brand.create({ ...req.body, slug });
  res.status(201).json({ success: true, message: "Brand created.", data: { brand } });
});

export const updateBrand = asyncHandler(async (req: Request, res: Response) => {
  const body = { ...req.body };
  if (body.name && !body.slug) body.slug = generateSlug(body.name);
  const brand = await Brand.findByIdAndUpdate(req.params.id, body, {
    new: true,
    runValidators: true,
  });
  if (!brand) throw new ApiError(404, "Brand not found.");
  res.status(200).json({ success: true, message: "Brand updated.", data: { brand } });
});

export const deleteBrand = asyncHandler(async (req: Request, res: Response) => {
  const brand = await Brand.findByIdAndDelete(req.params.id);
  if (!brand) throw new ApiError(404, "Brand not found.");
  res.status(200).json({ success: true, message: "Brand deleted." });
});
