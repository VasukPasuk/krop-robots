"use client"

import {useParams} from "next/navigation";
import decodeUriComponent from "decode-uri-component";
import ProductAddReview from "@/custom-components/ui/(client)/ProductPage/ProductReviewsPage/ProductAddReview";
import {useQuery} from "@tanstack/react-query";
import useQueryFilters from "@/hooks/useQueryFilters";
import {ReviewService} from "@/services/review.service";
import {useSpecialQueries} from "@/hooks/useSpecialQueries";
import {Divider, MenuItem, Pagination, Select} from "@mui/material";
import queryString from "query-string";
import ProductReview from "@/custom-components/ui/(client)/ProductPage/ProductReviewsPage/ProductReview";
import React from "react";

function ProductReviews() {
  const productName = decodeUriComponent(useParams()["id"] as string)
  const {appendSearchQuery} = useQueryFilters();
  const {flag, page} = useSpecialQueries()
  const productQuery = useQuery({
    queryKey: ["reviews", productName, flag, page],
    queryFn: async () => await ReviewService.getMany(productName, queryString.stringify({flag, page})),
    select: ({data}) => {
      return data
    }
  })

  if (productQuery.isLoading) {
    return (
      <>
        Loading...
      </>
    )
  }

  if (!productQuery.data || productQuery.isError) {
    return (
      <>
        Error
      </>
    )
  }


  return (
    <>
      <div className="flex lg:flex-row flex-col gap-x-12 mb-8 p-2 md:p-6">
        <div className="lg:w-3/5 w-full flex flex-col gap-y-4">
          <div className="flex justify-between items-center">
            <div className="text-3xl">
              {productQuery.data.count} відгуків
            </div>
            <div>
              <Select
                defaultValue={"newest"}
                value={flag ? flag : "newest"}
                MenuProps={{disableScrollLock: true}}
                className="w-[16ch]"
                onChange={(event) => appendSearchQuery({flag: event.target.value as "newest" | "latest"})}
              >
                <MenuItem value="newest">
                  Нові
                </MenuItem>
                <MenuItem value="latest">
                  Старі
                </MenuItem>
              </Select>
            </div>
          </div>
          <Divider/>
          <ul className="flex flex-col gap-y-6 flex-1">
            {productQuery.data.items.map((item) => (
              <ProductReview key={item.id} review={item}/>
            ))}
          </ul>
          <div className="flex justify-center items-center">
            <Pagination
              count={Math.ceil(productQuery.data.count / 10)}
              page={page}
              onChange={(_, new_page) => appendSearchQuery({page: new_page})}
              size="large"
              shape="rounded"
              siblingCount={1}
              boundaryCount={1}
            />
          </div>
        </div>
        <ProductAddReview product_name={productName}/>
      </div>
    </>
  )
}

export default ProductReviews;