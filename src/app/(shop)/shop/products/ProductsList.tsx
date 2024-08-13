"use client";
import React, {useEffect, useState} from "react";
import ProductCard from "@/custom-components/ui/ProductCard/ProductCard";
import {Product} from "@prisma/client";
import {useRouter, useSearchParams, usePathname} from "next/navigation";
import {Pagination, Skeleton} from "@mui/material";
import {MAX_ITEMS_IN_STORE_TO_VIEW} from "@/constants/index";
import {BASIC_CATEGORIES} from "@/constants";

interface IProductsListProps {
  products: Product[];
  totalPages: number;
  productsLoading: boolean;
}

function ProductsList({products,productsLoading, totalPages}: IProductsListProps) {

  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    const category_query = searchParams.get("category") || BASIC_CATEGORIES.All;
    router.push(`/shop/products?${category_query !== BASIC_CATEGORIES.All ? `category=${searchParams.get("category")}&` : ""}page=${newPage}`, {scroll: false}
    );
  };

  const loadingContent = (
    <div className="w-full min-h-[75dvh] grid grid-cols-12 gap-4 grid-rows-12">
      {[...Array.from({length: 9})].map((_, index) => (
        <Skeleton className={"col-span-4 row-span-4 my-[-4.5rem]"}/>
      ))}
    </div>
  )

  const dataContent = (
    <div className="container h-full grid grid-cols-3 grid-rows-3 gap-6 pb-6 pt-6">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product}/>
      ))}
    </div>
  )

  return (
    <>
      {productsLoading && loadingContent}
      {!productsLoading && dataContent}
      <div className="container mt-4 flex items-center justify-center">
        <Pagination
          count={Math.ceil(totalPages / MAX_ITEMS_IN_STORE_TO_VIEW)}
          page={Number(searchParams.get("page")) || 1}
          onChange={handlePageChange}
          size="large"
          shape="rounded"
        />
      </div>
    </>
  );
};

export default ProductsList;
