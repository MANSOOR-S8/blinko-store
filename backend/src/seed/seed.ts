import mongoose from "mongoose";
import { env } from "../config/env";
import User from "../models/User.model";
import Category from "../models/Category.model";
import Brand from "../models/Brand.model";
import Product from "../models/Product.model";
import Coupon from "../models/Coupon.model";
import { generateSlug, generateSku } from "../utils/generateSlug";

async function seed() {
  await mongoose.connect(env.MONGODB_URL);
  console.log("Connected. Seeding...");

  // Admin user
  const adminEmail = "admin@example.com";
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await User.create({
      name: "Admin",
      email: adminEmail,
      password: "Admin@12345",
      role: "admin",
    });
    console.log(`Created admin user: ${adminEmail} / Admin@12345`);
  }

  // Categories
  const categoryNames = [
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Beauty",
    "Sports",
  ];
  const categories: any[] = [];
  for (const name of categoryNames) {
    const slug = generateSlug(name);
    let category = await Category.findOne({ slug });
    if (!category) category = await Category.create({ name, slug });
    categories.push(category);
  }

  // Brands
  const brandNames = ["Nova", "Everline", "Craftsman", "Aura", "Peakline"];
  const brands: any[] = [];
  for (const name of brandNames) {
    const slug = generateSlug(name);
    let brand = await Brand.findOne({ slug });
    if (!brand) brand = await Brand.create({ name, slug });
    brands.push(brand);
  }

  // Products
  const existingCount = await Product.countDocuments();
  if (existingCount === 0) {
    const sampleProducts = [
      {
        name: "Wireless Noise-Cancelling Headphones",
        price: 199.99,
        discountPercentage: 15,
      },
      { name: "Smart Fitness Watch", price: 149.99, discountPercentage: 10 },
      { name: "Ceramic Cookware Set", price: 89.99, discountPercentage: 0 },
      { name: "Organic Face Serum", price: 34.99, discountPercentage: 20 },
      { name: "Trail Running Shoes", price: 119.99, discountPercentage: 5 },
      { name: "4K Action Camera", price: 249.99, discountPercentage: 12 },
      {
        name: "Minimalist Leather Backpack",
        price: 79.99,
        discountPercentage: 0,
      },
      {
        name: "Stainless Steel Water Bottle",
        price: 24.99,
        discountPercentage: 0,
      },
    ];

    for (let i = 0; i < sampleProducts.length; i++) {
      const p = sampleProducts[i];
      const category = categories[i % categories.length];
      const brand = brands[i % brands.length];
      await Product.create({
        name: p.name,
        slug: generateSlug(p.name),
        description: `${p.name} — high quality, built to last, backed by our satisfaction guarantee.`,
        price: p.price,
        discountPercentage: p.discountPercentage,
        category: category._id,
        brand: brand._id,
        thumbnail: "/images/products/placeholder.png",
        images: ["/images/products/placeholder.png"],
        stock: 20 + i,
        sku: generateSku(),
        isFeatured: i % 3 === 0,
        isTrending: i % 2 === 0,
        isNewArrival: i < 3,
        isBestSeller: i % 4 === 0,
      });
    }
    console.log(`Created ${sampleProducts.length} products.`);
  }

  // Coupon
  const existingCoupon = await Coupon.findOne({ code: "WELCOME10" });
  if (!existingCoupon) {
    await Coupon.create({
      code: "WELCOME10",
      type: "percentage",
      value: 10,
      minOrderAmount: 50,
      usageLimit: 0,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    });
    console.log("Created coupon WELCOME10 (10% off orders over $50).");
  }

  console.log("Seeding complete.");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
