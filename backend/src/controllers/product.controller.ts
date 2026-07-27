import { Request, Response } from "express";
import Product from "../models/Product.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { generateSlug, generateSku } from "../utils/generateSlug";

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const {
    search,
    category,
    brand,
    minPrice,
    maxPrice,
    rating,
    inStock,
    featured,
    trending,
    newArrival,
    bestSeller,
    sort = "-createdAt",
    page = "1",
    limit = "12",
  } = req.query as Record<string, string>;

  const filter: Record<string, unknown> = { isActive: true };
  if (search) filter.$text = { $search: search };
  if (category) filter.category = category;
  if (brand) filter.brand = brand;
  if (rating) filter.ratingsAverage = { $gte: Number(rating) };
  if (inStock === "true") filter.stock = { $gt: 0 };
  if (featured === "true") filter.isFeatured = true;
  if (trending === "true") filter.isTrending = true;
  if (newArrival === "true") filter.isNewArrival = true;
  if (bestSeller === "true") filter.isBestSeller = true;
  if (minPrice || maxPrice) {
    filter.price = {
      ...(minPrice && { $gte: Number(minPrice) }),
      ...(maxPrice && { $lte: Number(maxPrice) }),
    };
  }

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 12));
  const skip = (pageNum - 1) * limitNum;

  const [products, total] = await Promise.all([
    Product.find(filter)
      .populate("category", "name slug")
      .populate("brand", "name slug")
      .sort(sort)
      .skip(skip)
      .limit(limitNum),
    Product.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    data: {
      products,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    },
  });
});

export const getProductBySlugOrId = asyncHandler(async (req: Request, res: Response) => {
  const { idOrSlug } = req.params;
  const query = idOrSlug.match(/^[0-9a-fA-F]{24}$/) ? { _id: idOrSlug } : { slug: idOrSlug };
  const product = await Product.findOne({ ...query, isActive: true })
    .populate("category", "name slug")
    .populate("brand", "name slug");
  if (!product) throw new ApiError(404, "Product not found.");
  res.status(200).json({ success: true, data: { product } });
});

export const getRelatedProducts = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new ApiError(404, "Product not found.");
  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
    isActive: true,
  })
    .limit(8)
    .populate("category", "name slug");
  res.status(200).json({ success: true, data: { products: related } });
});

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body;
  const slug = body.slug ? generateSlug(body.slug) : generateSlug(body.name);
  const sku = body.sku || generateSku();
  const product = await Product.create({ ...body, slug, sku });
  res.status(201).json({ success: true, message: "Product created.", data: { product } });
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const body = { ...req.body };
  if (body.name && !body.slug) body.slug = generateSlug(body.name);
  const product = await Product.findByIdAndUpdate(req.params.id, body, {
    new: true,
    runValidators: true,
  });
  if (!product) throw new ApiError(404, "Product not found.");
  res.status(200).json({ success: true, message: "Product updated.", data: { product } });
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) throw new ApiError(404, "Product not found.");
  res.status(200).json({ success: true, message: "Product deleted." });
});

export const updateStock = asyncHandler(async (req: Request, res: Response) => {
  const { stock } = req.body;
  if (typeof stock !== "number" || stock < 0) throw new ApiError(400, "Valid stock value required.");
  const product = await Product.findByIdAndUpdate(req.params.id, { stock }, { new: true });
  if (!product) throw new ApiError(404, "Product not found.");
  res.status(200).json({ success: true, data: { product } });
});
