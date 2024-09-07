import React from 'react';
import CreateProductForm from "@/custom-components/ui/(admin)/CreateProductForm";

interface IPageProps {

}

function Page(props: IPageProps) {
  return (
    <section className="flex w-full">
      <CreateProductForm/>
    </section>
  )
}

export default Page