import React from "react";
import ProductTabs from "@/custom-components/ui/(client)/ProductPage/ProductTabs";

type LayoutProps = {
  children: React.ReactNode
}

export default function layout({children}: LayoutProps) {
  return (
    <>
      <div className="max-w-[1280px] min-h-dvh mx-auto flex flex-1 flex-col gap-y-4">
        <ProductTabs/>
        {children}
      </div>
    </>
  )
}