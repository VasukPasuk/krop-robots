"use client"

import {useQuery} from "@tanstack/react-query";
import {usePagination} from "@/hooks/usePagination";
import ProductFetcher from "@/services/fetchers/ProductFetcher";
import queryString from "query-string";
import CatalogCard from "@/custom-components/ui/(client)/CatalogPage/CatalogCard";

function Catalog() {
  const {page, limit} = usePagination(1, 15)
  const {isLoading, data} = useQuery({
    queryKey: ["products", page, limit],
    queryFn: () => ProductFetcher.getCatalog(queryString.stringify({page: page, limit: limit})),
  })

  if (isLoading) return (
    <section>
      Loading...
    </section>
  )

  if (!data) {
    return (
      <section>
        1
      </section>
    )
  }

  return (
    <section className="grid grid-cols-5 gap-4">
      {
        data.items.map((data) => (
          <CatalogCard key={data.name} data={data} />
        ))
      }
    </section>
  )
}

export default Catalog;