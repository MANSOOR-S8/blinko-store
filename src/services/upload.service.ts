import { apiClient } from "./api.client";
import { ApiResponse } from "@/types/api.types";

export const uploadService = {
  async uploadSingle(file: File): Promise<{ url: string; filename: string }> {
    const formData = new FormData();
    formData.append("image", file);
    const { data } = await apiClient.post<ApiResponse<{ url: string; filename: string }>>(
      "/upload/single",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return data.data;
  },

  async uploadMultiple(files: File[]): Promise<{ url: string; filename: string }[]> {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
    const { data } = await apiClient.post<ApiResponse<{ files: { url: string; filename: string }[] }>>(
      "/upload/multiple",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return data.data.files;
  },
};
