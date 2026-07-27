"use client";
import { useMemo, useState } from "react";

export function usePagination(totalPages: number, initialPage = 1) {
  const [page, setPage] = useState(initialPage);

  const canPrev = page > 1;
  const canNext = page < totalPages;

  const pageNumbers = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]);

  return {
    page,
    setPage,
    nextPage: () => canNext && setPage((p) => p + 1),
    prevPage: () => canPrev && setPage((p) => p - 1),
    canPrev,
    canNext,
    pageNumbers,
  };
}
