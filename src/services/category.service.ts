import { apiClient } from "./api.client";
import { ApiResponse } from "@/types/api.types";
import { Category, Brand } from "@/types/product.types";

export const categoryService = {
  async getAll(): Promise<Category[]> {
    const { data } = await apiClient.get<ApiResponse<{ categories: Category[] }>>("/categories");
    return data.data.categories;
  },
  async getBySlug(idOrSlug: string): Promise<Category> {
    const { data } = await apiClient.get<ApiResponse<{ category: Category }>>(`/categories/${idOrSlug}`);
    return data.data.category;
  },
  async create(payload: Partial<Category>): Promise<Category> {
    const { data } = await apiClient.post<ApiResponse<{ category: Category }>>("/categories", payload);
    return data.data.category;
  },
  async update(id: string, payload: Partial<Category>): Promise<Category> {
    const { data } = await apiClient.patch<ApiResponse<{ category: Category }>>(`/categories/${id}`, payload);
    return data.data.category;
  },
  async remove(id: string): Promise<void> {
    await apiClient.delete(`/categories/${id}`);
  },
};

export const brandService = {
  async getAll(): Promise<Brand[]> {
    const { data } = await apiClient.get<ApiResponse<{ brands: Brand[] }>>("/brands");
    return data.data.brands;
  },
  async create(payload: Partial<Brand>): Promise<Brand> {
    const { data } = await apiClient.post<ApiResponse<{ brand: Brand }>>("/brands", payload);
    return data.data.brand;
  },
  async update(id: string, payload: Partial<Brand>): Promise<Brand> {
    const { data } = await apiClient.patch<ApiResponse<{ brand: Brand }>>(`/brands/${id}`, payload);
    return data.data.brand;
  },
  async remove(id: string): Promise<void> {
    await apiClient.delete(`/brands/${id}`);
  },
};
