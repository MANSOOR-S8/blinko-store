"use client";

import { useCallback, useEffect, useState } from "react";
import { wishlistService } from "@/services/cart.service";
import { Wishlist } from "@/types/global.types";
import { useAuth } from "./useAuth";
import { getErrorMessage } from "@/services/api.client";

export function useWishlist() {
  const { isAuthenticated } = useAuth();
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    try {
      setWishlist(await wishlistService.get());
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const add = useCallback(async (productId: string) => {
    const updated = await wishlistService.add(productId);
    setWishlist(updated);
    return updated;
  }, []);

  const remove = useCallback(async (productId: string) => {
    const updated = await wishlistService.remove(productId);
    setWishlist(updated);
    return updated;
  }, []);

  const isWishlisted = useCallback(
    (productId: string) => wishlist?.products.some((p) => p._id === productId) ?? false,
    [wishlist],
  );

  return { wishlist, isLoading, error, add, remove, isWishlisted, refresh };
}
