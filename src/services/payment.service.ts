import { apiClient } from "./api.client";
import { ApiResponse } from "@/types/api.types";
import { Order } from "@/types/order.types";

export const paymentService = {
  async createIntent(orderId: string): Promise<{ clientSecret: string; paymentIntentId: string }> {
    const { data } = await apiClient.post<ApiResponse<{ clientSecret: string; paymentIntentId: string }>>(
      "/payments/create-intent",
      { orderId },
    );
    return data.data;
  },
  async verify(paymentIntentId: string): Promise<Order> {
    const { data } = await apiClient.post<ApiResponse<{ order: Order }>>("/payments/verify", {
      paymentIntentId,
    });
    return data.data.order;
  },
};
