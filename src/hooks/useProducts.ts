"use client";

import { useEffect, useState, useCallback } from "react";
import { productService } from "@/services/product.service";
import { Product } from "@/types/product.types";
import { Pagination, ProductQueryParams } from "@/types/api.types";
import { getErrorMessage } from "@/services/api.client";

export function useProducts(initialParams: ProductQueryParams = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<ProductQueryParams>(initialParams);

  const fetchProducts = useCallback(async (queryParams: ProductQueryParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await productService.getAll(queryParams);
      setProducts(result.products);
      setPagination(result.pagination);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)]);

  return { products, pagination, isLoading, error, params, setParams, refetch: () => fetchProducts(params) };
}

export function useProduct(idOrSlug: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!idOrSlug) return;
    setIsLoading(true);
    productService
      .getBySlug(idOrSlug)
      .then(setProduct)
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setIsLoading(false));
  }, [idOrSlug]);

  return { product, isLoading, error };
}
