import React from 'react';
import {CreateProductProvider} from "@/context/CreateProductContext";
import CreateProductPage from "@/custom-components/ui/(admin)/CreateProductPage/CreateProductPage";
import {useQueries} from "@tanstack/react-query";
import CategoryFetcher from "@/services/fetchers/CategoryFetcher";
import TagFetcher from "@/services/fetchers/TagFetcher";

function Page() {
  return (
    <section className="flex w-full p-4">
      <CreateProductProvider>
        <CreateProductPage>
          <div className="w-full flex flex-1 lg:flex-row flex-col gap-4">
            <CreateProductPage.ImagesForm/>
            <CreateProductPage.ProductsForm/>
          </div>
          <CreateProductPage.VariantsForm/>
        </CreateProductPage>
      </CreateProductProvider>
    </section>
  )
}

export default Page