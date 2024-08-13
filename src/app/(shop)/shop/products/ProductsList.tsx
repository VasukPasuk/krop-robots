"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "@/custom-components/ui/ProductCard/ProductCard";
import { Product } from "@prisma/client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Pagination } from "@mui/material";
import { MAX_ITEMS_IN_STORE_TO_VIEW } from "@/constants/index";
import { BASIC_CATEGORIES } from "@/constants";

interface IProductsListProps {
  products: Product[];
  totalPages: number;
}

function ProductsList( {products, totalPages}:IProductsListProps) {

  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    router.push(
      `/shop/products?${searchParams.get("category") !== BASIC_CATEGORIES.All ? `category=${searchParams.get("category")}&` : ""}page=${newPage}`,
      { scroll: false }
    );
  };

  return (
    <>
      <div className="container h-full grid grid-cols-3 grid-rows-3 gap-6 pb-6 pt-6">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="container flex items-center justify-center">
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
