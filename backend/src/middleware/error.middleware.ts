import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
}

export function errorHandler(
  err: Error | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  let statusCode = err instanceof ApiError ? err.statusCode : 500;
  let message = err.message || "Internal server error";
  let errors = err instanceof ApiError ? err.errors : undefined;

  // Mongoose validation error
  if (err.name === "ValidationError") {
    statusCode = 400;
    errors = (err as any).errors;
  }
  // Mongoose duplicate key error
  if ((err as any).code === 11000) {
    statusCode = 409;
    const field = Object.keys((err as any).keyValue || {})[0];
    message = field ? `${field} already exists.` : "Duplicate value.";
  }
  // Mongoose cast error (bad ObjectId)
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format.";
  }

  if (statusCode === 500) {
    console.error("[error]", err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(errors ? { errors } : {}),
  });
}
