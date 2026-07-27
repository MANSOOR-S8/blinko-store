import { apiClient } from "./api.client";
import { ApiResponse, Pagination } from "@/types/api.types";
import { Order } from "@/types/order.types";
import { User } from "@/types/user.types";
import { Product } from "@/types/product.types";

export interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  recentOrders: Order[];
  lowStockProducts: Pick<Product, "_id" | "name" | "stock" | "sku">[];
}

export const adminService = {
  async getStats(): Promise<DashboardStats> {
    const { data } = await apiClient.get<ApiResponse<DashboardStats>>("/admin/stats");
    return data.data;
  },
  async getUsers(params: { page?: number; limit?: number } = {}): Promise<{ users: User[]; pagination: Pagination }> {
    const { data } = await apiClient.get<ApiResponse<{ users: User[]; pagination: Pagination }>>(
      "/admin/users",
      { params },
    );
    return data.data;
  },
};
