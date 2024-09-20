"use client"

import {useParams} from "next/navigation";
import decodeUriComponent from "decode-uri-component";
import ProductAddReview from "@/custom-components/ui/(client)/ProductPage/ProductReviewsPage/ProductAddReview";
import {useQuery} from "@tanstack/react-query";

function ProductReviews() {
  const productName = decodeUriComponent(useParams()["id"] as string)

  const productQuery = useQuery({
    queryKey: [productName],
  })

  if (productQuery.isLoading) {
    return  (
      <>
        Loading
      </>
    )
  }

  if (!productQuery.data || !productQuery.isError) {
    return (

    )
  }


  return (
    <>
      <div className="col-span-full">
        <div>
          <div>

          </div>
          <ul className="flex flex-col gap-y-2 flex-1">

          </ul>
          <div>

          </div>
        </div>
        <ProductAddReview product_name={productName}/>
      </div>
    </>
  )
}

export default ProductReviews;