import React from 'react';
import CategoryTable from "@/custom-components/ui/(admin)/CategoriesTablePage/CategoriesTable";

interface IPageProps {

}

function Page(props: IPageProps) {
  return (
    <section className="flex w-full">
      <CategoryTable/>
    </section>
  )
}

export default Page
