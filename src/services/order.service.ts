import { apiClient } from "./api.client";
import { ApiResponse, Pagination } from "@/types/api.types";
import { Order, PlaceOrderPayload, OrderStatus } from "@/types/order.types";
import { Coupon } from "@/types/product.types";

export const orderService = {
  async placeOrder(payload: PlaceOrderPayload): Promise<Order> {
    const { data } = await apiClient.post<ApiResponse<{ order: Order }>>("/orders", payload);
    return data.data.order;
  },
  async getMyOrders(): Promise<Order[]> {
    const { data } = await apiClient.get<ApiResponse<{ orders: Order[] }>>("/orders/my-orders");
    return data.data.orders;
  },
  async getById(id: string): Promise<Order> {
    const { data } = await apiClient.get<ApiResponse<{ order: Order }>>(`/orders/${id}`);
    return data.data.order;
  },
  async cancel(id: string): Promise<Order> {
    const { data } = await apiClient.post<ApiResponse<{ order: Order }>>(`/orders/${id}/cancel`);
    return data.data.order;
  },

  // --- Admin ---
  async getAll(params: { status?: OrderStatus; page?: number; limit?: number } = {}): Promise<{ orders: Order[]; pagination: Pagination }> {
    const { data } = await apiClient.get<ApiResponse<{ orders: Order[]; pagination: Pagination }>>(
      "/orders",
      { params },
    );
    return data.data;
  },
  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    const { data } = await apiClient.patch<ApiResponse<{ order: Order }>>(`/orders/${id}/status`, { status });
    return data.data.order;
  },
};

export const couponService = {
  async validate(code: string, itemsPrice: number): Promise<{ coupon: Pick<Coupon, "code" | "type" | "value">; discountAmount: number }> {
    const { data } = await apiClient.post<
      ApiResponse<{ coupon: Pick<Coupon, "code" | "type" | "value">; discountAmount: number }>
    >("/coupons/validate", { code, itemsPrice });
    return data.data;
  },
  async getAll(): Promise<Coupon[]> {
    const { data } = await apiClient.get<ApiResponse<{ coupons: Coupon[] }>>("/coupons");
    return data.data.coupons;
  },
  async create(payload: Partial<Coupon>): Promise<Coupon> {
    const { data } = await apiClient.post<ApiResponse<{ coupon: Coupon }>>("/coupons", payload);
    return data.data.coupon;
  },
  async update(id: string, payload: Partial<Coupon>): Promise<Coupon> {
    const { data } = await apiClient.patch<ApiResponse<{ coupon: Coupon }>>(`/coupons/${id}`, payload);
    return data.data.coupon;
  },
  async remove(id: string): Promise<void> {
    await apiClient.delete(`/coupons/${id}`);
  },
};
