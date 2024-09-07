import React from 'react';
import TagsTable from "@/custom-components/ui/(admin)/TagsTablePage/TagsTable";

interface IPageProps {

}

function Page(props: IPageProps) {
  return (
    <section className="flex w-full gap-x-4">
      <TagsTable/>
    </section>
  )
}

export default Page