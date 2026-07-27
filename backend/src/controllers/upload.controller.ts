import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { env } from "../config/env";

function toPublicUrl(req: Request, filename: string): string {
  return `${req.protocol}://${req.get("host")}/uploads/${filename}`;
}

export const uploadSingle = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) throw new ApiError(400, "No file uploaded.");
  res.status(201).json({
    success: true,
    data: { url: toPublicUrl(req, req.file.filename), filename: req.file.filename },
  });
});

export const uploadMultiple = asyncHandler(async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[] | undefined;
  if (!files || files.length === 0) throw new ApiError(400, "No files uploaded.");
  const urls = files.map((f) => ({ url: toPublicUrl(req, f.filename), filename: f.filename }));
  res.status(201).json({ success: true, data: { files: urls } });
});
