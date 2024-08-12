import React from "react";
import AdminHeader from "@/custom-components/ui/(admin)/AdminHeader";
import AdminDrawer from "@/custom-components/ui/(admin)/AdminDrawer";

type LayoutProps = {
  children: React.ReactNode
}

export default function layout({children}: LayoutProps) {
  return (
    <>
      <AdminHeader/>
      <div className="flex flex-row min-h-dvh mt-16">
        <AdminDrawer/>
        {children}
      </div>
    </>
  )
}