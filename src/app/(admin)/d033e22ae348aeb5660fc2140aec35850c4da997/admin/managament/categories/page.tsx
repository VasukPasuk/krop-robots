import React from 'react';
import CategoriesList from "@/custom-components/ui/(admin)/CategoriesList";

interface IPageProps {
  children: React.ReactNode
}

function Page({}: IPageProps) {
  return (
    <div className="flex flex-col gap-y-4 p-8 h-full">
      <CategoriesList/>
    </div>
  )
}

export default Page