import * as path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config({ path: path.resolve(__dirname, "../.env") });

export const env = {
  PORT: Number(process.env.PORT) || 5000,

  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET: process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET || "",

  // Legacy and newer env keys supported side-by-side
  DB_URI: process.env.DB_URI || process.env.MONGODB_URL || "",
  MONGODB_URL: process.env.MONGODB_URL || process.env.DB_URI || "",

  // JWT keys (access/refresh) and expirations expected by various modules
  JWT_ACCESS_SECRET:
    process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET || "",
  JWT_ACCESS_EXPIRES_IN:
    process.env.JWT_ACCESS_EXPIRES_IN || process.env.JWT_EXPIRES_IN || "15m",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "",
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "30d",

  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",

  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || "",

  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || "",
} as const;

// import * as path from "path";
// import * as dotenv from 'dotenv';

// // Resolve .env file located at project root
// const envPath = path.resolve(__dirname, '../../../', '.env');
// dotenv.config({ path: envPath });

// export const env = {
//   PORT: Number(process.env.PORT) || 5000,
//   NODE_ENV: process.env.NODE_ENV || 'development',
//   JWT_SECRET: process.env.JWT_SECRET ?? '',
//   // Support both DB_URI and legacy MONGODB_URL
//   DB_URI: process.env.DB_URI ?? process.env.MONGODB_URL ?? '',
//   STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ?? '',
//   CLIENT_URL: process.env.CLIENT_URL ?? 'http://localhost:3000',
// } as const;
