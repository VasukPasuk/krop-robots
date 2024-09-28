import {useRouter, useSearchParams} from 'next/navigation';
import {useCallback, useEffect} from 'react';

type OrderRuleUnion = "desc" | "asc"

// interface UsePaginationResult {
//   page: number;
//   limit: number;
//   order_rule: OrderRuleUnion;
//   setPage: (page: number) => void;
//   setLimit: (limit: number) => void;
// }

type TypeSort = "expensive_cheap" | "cheap_expensive"

export function useSpecialQueries(defaultPage: number = 1, defaultLimit: number = 10, defaultOrderRule: OrderRuleUnion = "desc") {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get('page')) || defaultPage;
  const limit = Number(searchParams.get('limit')) || defaultLimit;
  const order_rule = defaultOrderRule?.match(/^(asc|desc)$/i)?.[0].toLowerCase() as 'asc' | 'desc' || defaultOrderRule;

  const searchValue = searchParams.get('searchValue') || ""
  const searchField = searchParams.get('searchField') || ""

  const minPrice = Number(searchParams.get('minPrice')) || null
  const maxPrice = Number(searchParams.get('maxPrice')) || null

  const filterCategories = searchParams.get('filterCategories')
  const filterTags = searchParams.get('filterTags')

  const typeSort = searchParams.get('typeSort') as TypeSort


  const flag = (searchParams.get("flag") || "newest") as "newest" | "latest"

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


  return {
    page,
    limit,
    order_rule,
    searchValue,
    searchField,
    setPage,
    setLimit,
    minPrice,
    maxPrice,
    filterCategories,
    filterTags,
    flag,
    typeSort
  };
}