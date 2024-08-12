import React, {Suspense} from 'react';
import ShopUpperBar from "@/custom-components/ui/ShopUpperBar/ShopUpperBar";
import ShopFilterAside from "@/custom-components/ui/ShopFilterAside/ShopFilterAside";
import {CircularProgress, Pagination} from "@mui/material";
import {DATA} from "@/TEST_DATA";
import ProductsList from "@/app/(shop)/shop/products/ProductsList";
import {Category} from "@prisma/client";
import {InferGetServerSidePropsType} from "next";
import {axiosInstance} from "@/services/axios/axiosInstance";
import {SearchInput} from "@/app/(shop)/shop/products/Search";
import CategoryTabs from "@/custom-components/ui/CategoryTabs/CategoryTabs";


function Page() {
  return (
    <>
      <Suspense fallback={<CircularProgress/>}>
        <ShopUpperBar>
          <div className="w-full flex flex-row items-center justify-center">
            <SearchInput/>
          </div>
        </ShopUpperBar>
        <div className="mt-[112px] h-full flex flex-row  max-w-[1300px] mx-auto mb-8">
          <div className="w-full flex flex-col">
            <CategoryTabs/>
            <ProductsList products={DATA}/>
          </div>
        </div>
      </Suspense>
    </>
  );
}

export default Page;