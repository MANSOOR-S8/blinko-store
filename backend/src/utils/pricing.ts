import { ICoupon } from "../models/Coupon.model";

export interface CartLineInput {
  price: number;
  quantity: number;
}

export function calculateItemsPrice(items: CartLineInput[]): number {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return Math.round(total * 100) / 100;
}

export function calculateCouponDiscount(itemsPrice: number, coupon: ICoupon): number {
  if (itemsPrice < coupon.minOrderAmount) return 0;
  let discount =
    coupon.type === "percentage" ? (itemsPrice * coupon.value) / 100 : coupon.value;
  if (coupon.maxDiscountAmount) discount = Math.min(discount, coupon.maxDiscountAmount);
  discount = Math.min(discount, itemsPrice);
  return Math.round(discount * 100) / 100;
}

export function calculateShipping(itemsPrice: number): number {
  if (itemsPrice === 0) return 0;
  return itemsPrice >= 100 ? 0 : 9.99;
}

export function calculateTax(taxableAmount: number, rate = 0.08): number {
  return Math.round(taxableAmount * rate * 100) / 100;
}

export interface OrderTotals {
  itemsPrice: number;
  discountAmount: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}

export function calculateOrderTotals(
  items: CartLineInput[],
  coupon: ICoupon | null,
): OrderTotals {
  const itemsPrice = calculateItemsPrice(items);
  const discountAmount = coupon ? calculateCouponDiscount(itemsPrice, coupon) : 0;
  const shippingPrice = calculateShipping(itemsPrice);
  const taxPrice = calculateTax(itemsPrice - discountAmount);
  const totalPrice =
    Math.round((itemsPrice - discountAmount + shippingPrice + taxPrice) * 100) / 100;
  return { itemsPrice, discountAmount, shippingPrice, taxPrice, totalPrice };
}
