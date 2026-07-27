import { Product } from "./product.types";

export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
  priceAtAdd: number;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
}

export interface Wishlist {
  _id: string;
  user: string;
  products: Product[];
}
