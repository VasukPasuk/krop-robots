import React from 'react';
import CategoriesList from "@/custom-components/ui/(admin)/CategoriesList";

interface IPageProps {

}

function Page(props: IPageProps) {
  return (
    <div className="flex flex-col gap-y-4 p-8 h-full">
      <CategoriesList/>
    </div>
  )
}

export default Page