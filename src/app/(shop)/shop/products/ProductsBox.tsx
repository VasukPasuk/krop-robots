"use client";
import React, {useEffect, useState} from "react";
import {Category, Product} from "@prisma/client";
import {useSearchParams} from "next/navigation";
import CategoryTabs from "@/custom-components/ui/CategoryTabs/CategoryTabs";
import ProductsList from "@/app/(shop)/shop/products/ProductsList";
import {Skeleton} from "@mui/material";
import {useQuery} from "@tanstack/react-query";

function ProductsBox() {

  const searchParams = useSearchParams();
  const params = {
    category: searchParams.get("category") || "",
    page: Number(searchParams.get("page")) || 1,
    search: searchParams.get("search") || '',
  };

  const {data: productData, isLoading: isLoadingProducts, refetch} = useQuery({
    queryKey: ["products", params.category, params.page, 9],
    queryFn: async ({queryKey}):Promise<{products: Product[], total: number}> => {
      const [, category = "", page = 0, take = 9] = queryKey;
      const response = await fetch(`/api/products?category=${category}&skip=${(Number(page) - 1) * 9}&take=${take}&search=${params.search}`, {method: "GET"});
      if (!response.ok) throw new Error("Error response");
      return response.json();
    },
  });

  const {data: categories, isLoading: isLoadingCategories} = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch("/api/categories", {method: "GET"})
      if (!response.ok) throw new Error("Error response")
      return response.json()
    },
  })



  useEffect(() => {
    refetch()
  }, [params.page, params.category,  params.search]);


  if (isLoadingCategories || isLoadingProducts) {
    return (
      <div className={"mt-[112px] min-h-dvh flex gap-0 flex-col max-w-[1300px] mx-auto mb-8"}>
        <Skeleton className={"w-full h-32"}/>
        <div className="w-full min-h-[80dvh] grid grid-cols-12 gap-4 grid-rows-12">
          {[...Array.from({length: 9})].map((_, index) => (
            <Skeleton className={"col-span-4 row-span-4 my-[-4.5rem]"}/>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="mt-[112px] h-full flex flex-row max-w-[1300px] mx-auto mb-8">
      <div className="w-full flex flex-col">
        <CategoryTabs categories={categories}/>
        <ProductsList
          products={productData.products}
          totalPages={productData.total}
          productsLoading={isLoadingProducts}
        />
      </div>
    </div>
  );
};

export default ProductsBox;
