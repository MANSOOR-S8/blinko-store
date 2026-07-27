import { apiClient, setAccessToken } from "./api.client";
import { ApiResponse } from "@/types/api.types";
import { AuthResponse, LoginPayload, RegisterPayload, User, Address } from "@/types/user.types";

export const authService = {
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const { data } = await apiClient.post<ApiResponse<AuthResponse>>("/auth/register", payload);
    setAccessToken(data.data.accessToken);
    return data.data;
  },

  async login(payload: LoginPayload): Promise<AuthResponse> {
    const { data } = await apiClient.post<ApiResponse<AuthResponse>>("/auth/login", payload);
    setAccessToken(data.data.accessToken);
    return data.data;
  },

  async logout(): Promise<void> {
    await apiClient.post("/auth/logout");
    setAccessToken(null);
  },

  async getMe(): Promise<User> {
    const { data } = await apiClient.get<ApiResponse<{ user: User }>>("/auth/me");
    return data.data.user;
  },

  async updateProfile(payload: Partial<Pick<User, "name" | "phone" | "avatar">>): Promise<User> {
    const { data } = await apiClient.patch<ApiResponse<{ user: User }>>("/auth/me", payload);
    return data.data.user;
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await apiClient.post("/auth/change-password", { currentPassword, newPassword });
  },

  async addAddress(address: Address): Promise<Address[]> {
    const { data } = await apiClient.post<ApiResponse<{ addresses: Address[] }>>(
      "/auth/addresses",
      address,
    );
    return data.data.addresses;
  },

  async deleteAddress(addressId: string): Promise<Address[]> {
    const { data } = await apiClient.delete<ApiResponse<{ addresses: Address[] }>>(
      `/auth/addresses/${addressId}`,
    );
    return data.data.addresses;
  },
};
