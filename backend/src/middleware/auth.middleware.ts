import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { verifyAccessToken } from "../utils/generateToken";

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization;
    const token = header?.startsWith("Bearer ") ? header.split(" ")[1] : req.cookies?.accessToken;
    if (!token) throw new ApiError(401, "Not authenticated. Please log in.");
    const payload = verifyAccessToken(token);
    req.user = { id: payload.id, role: payload.role as "user" | "admin" };
    next();
  } catch {
    next(new ApiError(401, "Invalid or expired session. Please log in again."));
  }
}

// Attaches req.user if a valid token is present, but doesn't reject if absent
export function attachUserIfPresent(req: Request, _res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization;
    const token = header?.startsWith("Bearer ") ? header.split(" ")[1] : req.cookies?.accessToken;
    if (token) {
      const payload = verifyAccessToken(token);
      req.user = { id: payload.id, role: payload.role as "user" | "admin" };
    }
  } catch {
    // ignore invalid token in optional auth
  }
  next();
}
