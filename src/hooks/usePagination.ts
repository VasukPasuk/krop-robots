import {useRouter, useSearchParams} from 'next/navigation';
import { useCallback } from 'react';

type OrderRuleUnion = "desc" | "asc"

interface UsePaginationResult {
  page: number;
  limit: number;
  order_rule: OrderRuleUnion;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

export function usePagination(defaultPage:number = 1, defaultLimit:number = 10, defaultOrderRule: OrderRuleUnion = "desc"): UsePaginationResult {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get('page')) || defaultPage;
  const limit = Number(searchParams.get('limit')) || defaultLimit;
  const order_rule = defaultOrderRule?.match(/^(asc|desc)$/i)?.[0].toLowerCase() as 'asc' | 'desc' || defaultOrderRule;

  const setPage = useCallback((newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
  }, [searchParams, router]);

  const setLimit = useCallback((newLimit: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('limit', newLimit.toString());
    params.set('page', '1'); // Reset to first page when changing limit
    router.push(`?${params.toString()}`);
  }, [searchParams, router]);

  return { page, limit, setPage, setLimit, order_rule };
}