import React from 'react';
import ShopUpperBar from "@/custom-components/ui/ShopUpperBar/ShopUpperBar";
import ShopFilterAside from "@/custom-components/ui/ShopFilterAside/ShopFilterAside";
import {Pagination} from "@mui/material";
import {DATA} from "@/TEST_DATA";
import ProductsList from "@/app/(shop)/shop/products/ProductsList";

function Page() {
  return (
    <>
      <ShopUpperBar/>
      <div className="container mt-[64px] h-full flex flex-row  max-w-[1600px] mx-auto mb-8">
        <ShopFilterAside/>
        <div className="container flex flex-col">
          <ProductsList products={DATA}/>
        </div>
      </div>
    </>
  );
}

export default Page;