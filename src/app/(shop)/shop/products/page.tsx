import React from 'react';
import ShopUpperBar from "@/custom-components/ui/ShopUpperBar/ShopUpperBar";
import ShopFilterAside from "@/custom-components/ui/ShopFilterAside/ShopFilterAside";
import ProductCard from "@/custom-components/ui/ProductCard/ProductCard";
import {Pagination} from "@mui/material";

function Page() {
  return (
    <>
      <ShopUpperBar/>
      <div className="container mt-[48px] h-full flex flex-row  max-w-[1600px] mx-auto">
        <ShopFilterAside/>
        <div className="container flex flex-col">
          <div className="container h-full grid grid-cols-3 grid-rows-3 gap-6 pb-6 pt-6">
            {[...Array(9)].map((_, i) => (
              <ProductCard/>
            ))}
          </div>
          <div className="container flex items-center justify-center">
            <Pagination count={10} size={"large"} shape={"rounded"}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;