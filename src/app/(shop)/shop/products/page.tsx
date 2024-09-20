import React from 'react';
import Catalog from "@/custom-components/ui/(client)/CatalogPage/Catalog";
import CatalogFilter from "@/custom-components/ui/(client)/CatalogPage/CatalogFilter";
import CatalogSearch from "@/custom-components/ui/(client)/CatalogPage/CatalogSearch";


function Page() {
  return (
    <div className="container mt-4 mx-auto flex gap-x-4">
      <div className="hidden lg:block md:w-[260px]">
        <CatalogFilter/>
      </div>
      <div className="flex flex-col flex-1 gap-y-4 relative">
        <CatalogSearch/>
        <Catalog/>
      </div>
    </div>
  );
}

export default Page;