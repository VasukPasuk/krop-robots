import React, {Suspense} from 'react';
import ShopUpperBar from "@/custom-components/ui/ShopUpperBar/ShopUpperBar";
import {CircularProgress, Pagination} from "@mui/material";
import ProductsList from "@/app/(shop)/shop/products/ProductsList";
import {SearchInput} from "@/app/(shop)/shop/products/Search";
import CategoryTabs from "@/custom-components/ui/CategoryTabs/CategoryTabs";
import {getAllProducts} from "@/services/actions/productActions";


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
            <ProductsList/>
          </div>
        </div>
      </Suspense>
    </>
  );
}

export default Page;