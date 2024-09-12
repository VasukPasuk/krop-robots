"use client";
import {useRouter} from "next/navigation";
import queryString from "query-string";

export type TSortRule = "asc" | "desc";
export type TypeSort = "new" | "rating" | "expensive_cheap" | "cheap_expensive";

interface ISearchQueries {
  page: number;
  sortRule: TSortRule;
  sortProperty: string;
  minPrice: number;
  maxPrice: number;
  typeSort: TypeSort;
  searchField: string;
  searchValue: string;
  filterTags: string[];
  filterCategories: string[];
}

interface ISearchQueriesOption extends Partial<ISearchQueries> {
}

function useCatalogFilters() {
  const router = useRouter();


  const appendSearchQuery = (queriesObject: ISearchQueriesOption) => {
    const currentQueries: ISearchQueriesOption = queryString.parse(window.location.search);
    Object.entries(queriesObject).forEach(([key, value]) => {
      currentQueries[key] = value;
    })
    router.replace(location.pathname + "?" + queryString.stringify(currentQueries, {skipNull: true, skipEmptyString: true, arrayFormat: "comma"}))
  };


  const setSearchQuery = (queriesObject: ISearchQueriesOption) => {
    router.replace(location.pathname + "?" + queryString.stringify(queriesObject, {skipNull: true, skipEmptyString: true, arrayFormat: "comma"}))
  }

  const resetSearchQuery = () => router.replace(location.pathname)

  return {
    appendSearchQuery,
    setSearchQuery,
    resetSearchQuery
  };
}

export default useCatalogFilters;
