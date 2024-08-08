import React from 'react';
import ProductCard from "@/custom-components/ui/ProductCard/ProductCard";
import {Checkbox, FormControlLabel, FormGroup, Pagination} from "@mui/material";
import ShopFilterAside from "@/custom-components/ui/ShopFilterAside/ShopFilterAside";

function Page() {
  return (
    <section id="main-shop-page" className="container min-h-[90dvh] mt-6 flex flex-row max-w-[1600px] mx-auto">
      <ShopFilterAside/>
      <div className="container flex flex-col">
        <div className="container h-full grid grid-cols-3 grid-rows-3 gap-6 pb-6 pt-6">
          {[...Array(9)].map((_, i) => (
            <ProductCard/>
          ))}
        </div>
        <div className="container">
          <Pagination count={10} size={"large"} shape={"rounded"}/>
        </div>
      </div>
    </section>
  );
}

export default Page;