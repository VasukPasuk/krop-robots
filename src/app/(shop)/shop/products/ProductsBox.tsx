"use client";
import React, {useEffect, useState} from "react";
import {Category, Product} from "@prisma/client";
import {getCategories} from "@/services/actions/categoryActions";
import {getProductsWithLength} from "@/services/actions/productActions";
import {BASIC_CATEGORIES} from "@/constants";
import {useSearchParams} from "next/navigation";
import CategoryTabs from "@/custom-components/ui/CategoryTabs/CategoryTabs";
import ProductsList from "@/app/(shop)/shop/products/ProductsList";
import { Skeleton } from "@mui/material";
import { notFound } from "next/navigation";

interface IPageProps {
}

function ProductsBox() {
  const [loading, setLoading] = useState<boolean>(true); // Loading
  const [categories, setCategories] = useState<Category[]>([]) // Categories state array
  const [products, setProducts] = useState<Product[]>([]) // Products state array
  const [totalPages, setTotalPages] = useState<number>(0) // Total Pages state number
  const [error, setError] = useState<boolean>(false) // Error state


  const searchParams = useSearchParams();
  const params = {
    category: searchParams.get("category") || BASIC_CATEGORIES.All,
    page: Number(searchParams.get("page") || 1),
  };



  useEffect(() => {
    const init = async () => {
      try {
        const [productsData, categories] = await Promise.all([getProductsWithLength("", 0, 9), getCategories()])
        setProducts(productsData.products)
        setTotalPages(productsData.total)
        setCategories(categories)
      } catch (e) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [])

  useEffect(() => {
    const refresh = async () => {
      setLoading(true)
      try {
        const {total, products} = await getProductsWithLength(params.category !== BASIC_CATEGORIES.All ? params.category : "", 0, 9)
        setProducts(products)
        setTotalPages(total)
      } catch (e) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    refresh()
  }, [params.category])

  useEffect(() => {
    const refresh = async () => {
      setLoading(true)
      try {
        const {products} = await getProductsWithLength(params.category !== BASIC_CATEGORIES.All ? params.category : "", 0, 9);
        setProducts(products)
      } catch (e) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    refresh()
  }, [params.page])

  if (loading) {
    return (
      <div className={"mt-[112px] min-h-dvh flex flex-col max-w-[1300px] mx-auto mb-8"}>
        <Skeleton className={"w-full h-32"} />
        <Skeleton className={"w-full h-32"} />
        <Skeleton className={"w-full h-32"} />
        <Skeleton className={"w-full h-32"} />
        <Skeleton className={"w-full h-32"} />
      </div>
    )
  }

  return (
    <div className="mt-[112px] h-full flex flex-row max-w-[1300px] mx-auto mb-8">
      <div className="w-full flex flex-col">
        <CategoryTabs categories={categories}/>
        <ProductsList products={products} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default ProductsBox;
