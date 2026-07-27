import { Address } from "./user.types";

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type PaymentMethod = "stripe" | "cod";

export interface OrderItem {
  product: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

export interface Order {
  _id: string;
  user: string | { _id: string; name: string; email: string };
  items: OrderItem[];
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  stripePaymentIntentId?: string;
  couponCode?: string;
  itemsPrice: number;
  discountAmount: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  status: OrderStatus;
  statusHistory: { status: OrderStatus; changedAt: string }[];
  deliveredAt?: string;
  cancelledAt?: string;
  createdAt: string;
}

export interface PlaceOrderPayload {
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  couponCode?: string;
}
