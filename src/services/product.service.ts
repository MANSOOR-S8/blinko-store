import { apiClient } from "./api.client";
import { ApiResponse, Pagination, ProductQueryParams } from "@/types/api.types";
import { Product, Review } from "@/types/product.types";

export const productService = {
  async getAll(params: ProductQueryParams = {}): Promise<{ products: Product[]; pagination: Pagination }> {
    const { data } = await apiClient.get<ApiResponse<{ products: Product[]; pagination: Pagination }>>(
      "/products",
      { params },
    );
    return data.data;
  },

  async getBySlug(idOrSlug: string): Promise<Product> {
    const { data } = await apiClient.get<ApiResponse<{ product: Product }>>(`/products/${idOrSlug}`);
    return data.data.product;
  },

  async getRelated(productId: string): Promise<Product[]> {
    const { data } = await apiClient.get<ApiResponse<{ products: Product[] }>>(
      `/products/${productId}/related`,
    );
    return data.data.products;
  },

  async getReviews(productId: string): Promise<Review[]> {
    const { data } = await apiClient.get<ApiResponse<{ reviews: Review[] }>>(
      `/products/${productId}/reviews`,
    );
    return data.data.reviews;
  },

  async addReview(productId: string, payload: { rating: number; title?: string; comment: string }): Promise<Review> {
    const { data } = await apiClient.post<ApiResponse<{ review: Review }>>(
      `/products/${productId}/reviews`,
      payload,
    );
    return data.data.review;
  },

  // --- Admin ---
  async create(payload: Partial<Product>): Promise<Product> {
    const { data } = await apiClient.post<ApiResponse<{ product: Product }>>("/products", payload);
    return data.data.product;
  },

  async update(id: string, payload: Partial<Product>): Promise<Product> {
    const { data } = await apiClient.patch<ApiResponse<{ product: Product }>>(`/products/${id}`, payload);
    return data.data.product;
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/products/${id}`);
  },
};
