"use client"

import {useQuery} from "@tanstack/react-query";
import {useSpecialQueries} from "@/hooks/useSpecialQueries";
import ProductFetcher from "@/services/fetchers/ProductFetcher";
import queryString from "query-string";
import CatalogCard from "@/custom-components/ui/(client)/CatalogPage/CatalogCard";
import {MAX_ITEMS_TO_VIEW_IN_CATALOG} from "@/constants";
import {Pagination, Skeleton} from "@mui/material";
import React, {useEffect} from "react";
import {useSearchParams} from "next/navigation";
import Image from "next/image";
function Catalog() {
  const {
    page,
    limit,
    order_rule,
    searchField,
    searchValue,
    setPage,
    minPrice,
    maxPrice,
    filterCategories,
    filterTags
  } = useSpecialQueries(1, 15)
  const searchParams = useSearchParams()
  const {isLoading, data, refetch} = useQuery({
    queryKey: ["products", page, limit, searchField, searchValue, filterCategories, filterTags],
    queryFn: () => ProductFetcher.getCatalog(queryString.stringify({
      page: page,
      limit: limit,
      searchValue: searchValue,
      searchField: searchField, 
      minPrice: minPrice,
      maxPrice: maxPrice,
      filterCategories: filterCategories,
      filterTags: filterTags,
    }, {arrayFormat: "comma", skipNull: true, skipEmptyString: true})),
  })


  useEffect(() => {
    refetch()
  }, [searchParams])


  if (isLoading) return (
    <section className="grid grid-cols-5 auto-rows-[350px] gap-4 w-full">
      {[...Array(MAX_ITEMS_TO_VIEW_IN_CATALOG)].map(() => (
        <Skeleton className="overflow-hidden rounded" variant="rectangular" sx={{height: "100%"}}/>
      ))}
    </section>
  )

  if (!data) {
    return (
      <section>
        No data
      </section>
    )
  }

  const {count} = data;

  return (
    <>
      <section className="grid px-12 s420:px-0 s420:grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 w-full">
        {
          !!data.items.length ? data.items.map((data) => (
            <CatalogCard key={data.name} data={data}/>
          )) : (
            <div className="col-span-full h-dvh flex flex-col items-center justify-center text-2xl text-neutral-500 font-light">
              <Image src="/bad-search-filter.png" alt="bad filter request" className=" w-64  md:h-96 md:w-96" height={500} width={400}/>
              <span>Товарів не знайдено</span>
            </div>
          )
        }
      </section>
      <div className="w-full mb-12 mt-6 flex items-center justify-center">
        <Pagination
          count={Math.ceil(count / MAX_ITEMS_TO_VIEW_IN_CATALOG)}
          page={page}
          onChange={(_, pPage) => pPage !== page ? setPage(pPage) : undefined}
          size="large"
          shape="rounded"
          siblingCount={1}
          boundaryCount={1}
        />
      </div>
    </>

  )
}

export default Catalog;