import { Request, Response } from "express";
import User from "../models/User.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/generateToken";

const REFRESH_COOKIE = "refreshToken";
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
};

function sanitizeUser(user: any) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    phone: user.phone,
    addresses: user.addresses,
    createdAt: user.createdAt,
  };
}

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new ApiError(400, "Name, email, and password are required.");
  }
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) throw new ApiError(409, "An account with this email already exists.");

  const user = await User.create({ name, email, password });
  const accessToken = generateAccessToken(user.id, user.role);
  const refreshToken = generateRefreshToken(user.id);
  user.refreshToken = refreshToken;
  await user.save();

  res.cookie(REFRESH_COOKIE, refreshToken, cookieOptions);
  res.status(201).json({
    success: true,
    message: "Account created successfully.",
    data: { user: sanitizeUser(user), accessToken },
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) throw new ApiError(400, "Email and password are required.");

  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid email or password.");
  }
  if (!user.isActive) throw new ApiError(403, "This account has been deactivated.");

  const accessToken = generateAccessToken(user.id, user.role);
  const refreshToken = generateRefreshToken(user.id);
  user.refreshToken = refreshToken;
  await user.save();

  res.cookie(REFRESH_COOKIE, refreshToken, cookieOptions);
  res.status(200).json({
    success: true,
    message: "Logged in successfully.",
    data: { user: sanitizeUser(user), accessToken },
  });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies?.[REFRESH_COOKIE];
  if (token) {
    try {
      const { id } = verifyRefreshToken(token);
      await User.findByIdAndUpdate(id, { $unset: { refreshToken: 1 } });
    } catch {
      // token invalid/expired — nothing to clean up
    }
  }
  res.clearCookie(REFRESH_COOKIE);
  res.status(200).json({ success: true, message: "Logged out successfully." });
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies?.[REFRESH_COOKIE];
  if (!token) throw new ApiError(401, "No refresh token provided.");

  let payload: { id: string };
  try {
    payload = verifyRefreshToken(token);
  } catch {
    throw new ApiError(401, "Refresh token is invalid or expired.");
  }

  const user = await User.findById(payload.id).select("+refreshToken");
  if (!user || user.refreshToken !== token) {
    throw new ApiError(401, "Refresh token does not match. Please log in again.");
  }

  const accessToken = generateAccessToken(user.id, user.role);
  res.status(200).json({ success: true, data: { accessToken } });
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.user!.id);
  if (!user) throw new ApiError(404, "User not found.");
  res.status(200).json({ success: true, data: { user: sanitizeUser(user) } });
});

export const updateMe = asyncHandler(async (req: Request, res: Response) => {
  const { name, phone, avatar } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user!.id,
    { $set: { ...(name && { name }), ...(phone && { phone }), ...(avatar && { avatar }) } },
    { new: true, runValidators: true },
  );
  if (!user) throw new ApiError(404, "User not found.");
  res.status(200).json({ success: true, data: { user: sanitizeUser(user) } });
});

export const changePassword = asyncHandler(async (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    throw new ApiError(400, "Current and new password are required.");
  }
  const user = await User.findById(req.user!.id).select("+password");
  if (!user || !(await user.comparePassword(currentPassword))) {
    throw new ApiError(401, "Current password is incorrect.");
  }
  user.password = newPassword;
  await user.save();
  res.status(200).json({ success: true, message: "Password updated successfully." });
});

export const addAddress = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.user!.id);
  if (!user) throw new ApiError(404, "User not found.");
  if (req.body.isDefault) {
    user.addresses.forEach((a) => (a.isDefault = false));
  }
  user.addresses.push(req.body);
  await user.save();
  res.status(201).json({ success: true, data: { addresses: user.addresses } });
});

export const deleteAddress = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.user!.id);
  if (!user) throw new ApiError(404, "User not found.");
  user.addresses = user.addresses.filter((a: any) => a._id.toString() !== req.params.addressId) as any;
  await user.save();
  res.status(200).json({ success: true, data: { addresses: user.addresses } });
});
