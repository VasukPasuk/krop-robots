import React from 'react';
import Catalog from "@/custom-components/ui/(client)/CatalogPage/Catalog";
import CatalogFilter from "@/custom-components/ui/(client)/CatalogPage/CatalogFilter";
import CatalogSearch from "@/custom-components/ui/(client)/CatalogPage/CatalogSearch";


function Page() {
  return (
    <div className="container mt-16 mx-auto flex gap-x-4 py-6">
      <CatalogFilter/>
      <div className="flex flex-col flex-1 gap-y-4 relative">
        <CatalogSearch/>
        <Catalog/>
      </div>
    </div>
  );
}

export default Page;