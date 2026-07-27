"use client";

import { useCallback, useEffect, useState } from "react";
import { cartService } from "@/services/cart.service";
import { Cart } from "@/types/global.types";
import { useAuth } from "./useAuth";
import { getErrorMessage } from "@/services/api.client";

export function useCart() {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    try {
      setCart(await cartService.get());
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addItem = useCallback(
    async (productId: string, quantity = 1, size?: string, color?: string) => {
      const updated = await cartService.addItem({ productId, quantity, size, color });
      setCart(updated);
      return updated;
    },
    [],
  );

  const updateItem = useCallback(async (itemId: string, quantity: number) => {
    const updated = await cartService.updateItem(itemId, quantity);
    setCart(updated);
    return updated;
  }, []);

  const removeItem = useCallback(async (itemId: string) => {
    const updated = await cartService.removeItem(itemId);
    setCart(updated);
    return updated;
  }, []);

  const clear = useCallback(async () => {
    await cartService.clear();
    setCart((prev) => (prev ? { ...prev, items: [] } : prev));
  }, []);

  const itemCount = cart?.items.reduce((sum, i) => sum + i.quantity, 0) ?? 0;
  const subtotal = cart?.items.reduce((sum, i) => sum + i.priceAtAdd * i.quantity, 0) ?? 0;

  return { cart, itemCount, subtotal, isLoading, error, addItem, updateItem, removeItem, clear, refresh };
}
