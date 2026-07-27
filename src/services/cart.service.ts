import { apiClient } from "./api.client";
import { ApiResponse } from "@/types/api.types";
import { Cart, Wishlist } from "@/types/global.types";

export const cartService = {
  async get(): Promise<Cart> {
    const { data } = await apiClient.get<ApiResponse<{ cart: Cart }>>("/cart");
    return data.data.cart;
  },
  async addItem(payload: { productId: string; quantity?: number; size?: string; color?: string }): Promise<Cart> {
    const { data } = await apiClient.post<ApiResponse<{ cart: Cart }>>("/cart", payload);
    return data.data.cart;
  },
  async updateItem(itemId: string, quantity: number): Promise<Cart> {
    const { data } = await apiClient.patch<ApiResponse<{ cart: Cart }>>(`/cart/${itemId}`, { quantity });
    return data.data.cart;
  },
  async removeItem(itemId: string): Promise<Cart> {
    const { data } = await apiClient.delete<ApiResponse<{ cart: Cart }>>(`/cart/${itemId}`);
    return data.data.cart;
  },
  async clear(): Promise<void> {
    await apiClient.delete("/cart");
  },
};

export const wishlistService = {
  async get(): Promise<Wishlist> {
    const { data } = await apiClient.get<ApiResponse<{ wishlist: Wishlist }>>("/wishlist");
    return data.data.wishlist;
  },
  async add(productId: string): Promise<Wishlist> {
    const { data } = await apiClient.post<ApiResponse<{ wishlist: Wishlist }>>("/wishlist", { productId });
    return data.data.wishlist;
  },
  async remove(productId: string): Promise<Wishlist> {
    const { data } = await apiClient.delete<ApiResponse<{ wishlist: Wishlist }>>(`/wishlist/${productId}`);
    return data.data.wishlist;
  },
};
