import React from 'react';
import AdminProductsList from "@/custom-components/ui/(admin)/AdminProductsList";

interface IPageProps {

}

function Page(props: IPageProps) {
  return (
    <section className="w-full flex">
      <AdminProductsList/>
    </section>
  )
}

export default Page