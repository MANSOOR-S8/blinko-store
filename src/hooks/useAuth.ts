"use client";

import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser, clearUser, setAuthLoading } from "@/store/slices/authSlice";
import { authService } from "@/services/auth.service";
import { getAccessToken } from "@/services/api.client";
import { LoginPayload, RegisterPayload } from "@/types/user.types";
import { getErrorMessage } from "@/services/api.client";

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, status } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (status !== "idle") return;
    if (!getAccessToken()) {
      dispatch(clearUser());
      return;
    }
    dispatch(setAuthLoading());
    authService
      .getMe()
      .then((u) => dispatch(setUser(u)))
      .catch(() => dispatch(clearUser()));
  }, [status, dispatch]);

  const login = useCallback(
    async (payload: LoginPayload) => {
      try {
        const { user } = await authService.login(payload);
        dispatch(setUser(user));
        return { success: true as const };
      } catch (error) {
        return { success: false as const, message: getErrorMessage(error) };
      }
    },
    [dispatch],
  );

  const register = useCallback(
    async (payload: RegisterPayload) => {
      try {
        const { user } = await authService.register(payload);
        dispatch(setUser(user));
        return { success: true as const };
      } catch (error) {
        return { success: false as const, message: getErrorMessage(error) };
      }
    },
    [dispatch],
  );

  const logout = useCallback(async () => {
    await authService.logout();
    dispatch(clearUser());
  }, [dispatch]);

  return {
    user,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading" || status === "idle",
    isAdmin: user?.role === "admin",
    login,
    register,
    logout,
  };
}
