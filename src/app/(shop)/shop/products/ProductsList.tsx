"use client"
import React, {useEffect, useState} from 'react';
import ProductCard from "@/custom-components/ui/ProductCard/ProductCard";
import {Product} from "@prisma/client";
import {useRouter, useSearchParams, usePathname} from "next/navigation";
import {Pagination} from "@mui/material";
import {MAX_ITEMS_IN_STORE_TO_VIEW} from '@/constants/index';

interface IProductsListProps {
  products: Partial<Product>[]
}

function ProductsList(props: IProductsListProps) {
  const [products, setProducts] = useState<Partial<Product>[]>([])
  // const [page, setPage] = useState(1);
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams();
  const params = {
    category: searchParams.get("category") || "All",
    page: Number(searchParams.get("page") || 1),
  }
  useEffect(() => {
    setProducts(prevState => {
      if (params.category === "All") return props.products
      return props.products.filter(product => product.category_name === params.category)
    })
  }, [params.category]);

  // useEffect(() => {
  //   if (params.page == 1) return
  //   setPage(_ => params.page)
  // }, [params.page]);

  const totalPagesCount = Math.ceil(products.length / MAX_ITEMS_IN_STORE_TO_VIEW)
  return (
    <>
      <div className="container h-full grid grid-cols-3 grid-rows-3 gap-6 pb-6 pt-6">
        {products.slice((params.page - 1) * 9, 9 * params.page).map((product, i) => (
          <ProductCard key={i} product={product}/>
        ))}
      </div>
      <div className="container flex items-center justify-center">
        <Pagination
          count={totalPagesCount}
          onChange={(event, page) => router.push(`/shop/products/?category=${params.category}&page=${page}`)}
          size={"large"} shape={"rounded"}
        />
      </div>
    </>
  )
}

export default ProductsList