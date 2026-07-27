import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export function requireAdmin(req: Request, _res: Response, next: NextFunction) {
  if (!req.user) return next(new ApiError(401, "Not authenticated."));
  if (req.user.role !== "admin") return next(new ApiError(403, "Admin access required."));
  next();
}
