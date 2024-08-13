"use client"
import React, {useEffect, useState} from 'react';
import ProductCard from "@/custom-components/ui/ProductCard/ProductCard";
import {Product} from "@prisma/client";
import {useRouter, useSearchParams, usePathname} from "next/navigation";
import {Pagination} from "@mui/material";
import {MAX_ITEMS_IN_STORE_TO_VIEW} from '@/constants/index';
import {BASIC_CATEGORIES} from "@/constants";
import {getAllProducts} from "@/services/actions/productActions";

interface IProductsListProps {

}

function ProductsList(props: IProductsListProps) {
  const [page, setPage] = useState<number>(1)
  const [products, setProducts] = useState<Product[]>([])
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams();
  const params = {
    category: searchParams.get("category") || BASIC_CATEGORIES.All,
    page: Number(searchParams.get("page") || 1),
  }
  useEffect(() => {
    setProducts(prevState => {
      if (params.category === BASIC_CATEGORIES.All) return products
      return products.filter(product => product.category_name === params.category)
    })
    setPage(1)
  }, [params.category]);

  useEffect(() => {
    const setAllProducts = async () => {
      const products = await getAllProducts();
      setProducts(products)
    }
    setAllProducts()
  }, [])

  const totalPagesCount = Math.ceil(products.length / MAX_ITEMS_IN_STORE_TO_VIEW)
  return (
    <>
      <div className="container h-full grid grid-cols-3 grid-rows-3 gap-6 pb-6 pt-6">
        {products.map((product, i) => (
          <ProductCard key={i} product={product}/>
        ))}
      </div>
      <div className="container flex items-center justify-center">
        <Pagination
          count={totalPagesCount}
          page={page}
          defaultPage={1}
          onChange={(event, page) => {
            setPage(page)
            router.push(`/shop/products?${!params.category.includes(BASIC_CATEGORIES.All) ? `category=${params.category}&` : ''}page=${page}`, {scroll: false})
          }}
          size={"large"}
          shape={"rounded"}
        />
      </div>
    </>
  )
}

export default ProductsList