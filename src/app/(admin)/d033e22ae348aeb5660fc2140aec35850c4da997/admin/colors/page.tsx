import React from 'react';
import ColorsTable from "@/custom-components/ui/(admin)/ColorsTable";

interface IPageProps {

}

function Page(props: IPageProps) {
  return (
    <section className="flex w-full">
      <ColorsTable/>
    </section>
  )
}

export default Page