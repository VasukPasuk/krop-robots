"use client"

import {useQuery} from "@tanstack/react-query";
import {usePagination} from "@/hooks/usePagination";
import ProductFetcher from "@/services/fetchers/ProductFetcher";
import queryString from "query-string";
import CatalogCard from "@/custom-components/ui/(client)/CatalogPage/CatalogCard";
import {MAX_ITEMS_TO_VIEW_IN_CATALOG} from "@/constants";
import {Pagination, Skeleton} from "@mui/material";
import React from "react";

function Catalog() {
  const {page, limit, order_rule, setPage} = usePagination(1, 15)
  const {isLoading, data} = useQuery({
    queryKey: ["products", page, limit],
    queryFn: () => ProductFetcher.getCatalog(queryString.stringify({page: page, limit: limit})),
  })

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
        1
      </section>
    )
  }

  const {items, count} = data;

  return (
    <>
      <section className="grid grid-cols-5 gap-4 w-full">
        {
          data.items.map((data) => (
            <CatalogCard key={data.name} data={data}/>
          ))
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