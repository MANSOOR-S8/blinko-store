import { Request, Response } from "express";
import Category from "../models/Category.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { generateSlug } from "../utils/generateSlug";

export const getCategories = asyncHandler(async (_req: Request, res: Response) => {
  const categories = await Category.find({ isActive: true }).sort("name");
  res.status(200).json({ success: true, data: { categories } });
});

export const getCategoryBySlugOrId = asyncHandler(async (req: Request, res: Response) => {
  const { idOrSlug } = req.params;
  const query = idOrSlug.match(/^[0-9a-fA-F]{24}$/) ? { _id: idOrSlug } : { slug: idOrSlug };
  const category = await Category.findOne(query);
  if (!category) throw new ApiError(404, "Category not found.");
  res.status(200).json({ success: true, data: { category } });
});

export const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const slug = req.body.slug ? generateSlug(req.body.slug) : generateSlug(req.body.name);
  const category = await Category.create({ ...req.body, slug });
  res.status(201).json({ success: true, message: "Category created.", data: { category } });
});

export const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  const body = { ...req.body };
  if (body.name && !body.slug) body.slug = generateSlug(body.name);
  const category = await Category.findByIdAndUpdate(req.params.id, body, {
    new: true,
    runValidators: true,
  });
  if (!category) throw new ApiError(404, "Category not found.");
  res.status(200).json({ success: true, message: "Category updated.", data: { category } });
});

export const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) throw new ApiError(404, "Category not found.");
  res.status(200).json({ success: true, message: "Category deleted." });
});
