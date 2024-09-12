import React from 'react';
import ProductAbout from "@/custom-components/ui/(client)/ProductPage/ProductAbout";

function Page({params}: { params: { id: string } }) {
  return (
    <>
      <ProductAbout productName={params.id}/>
    </>
  )
}

export default Page