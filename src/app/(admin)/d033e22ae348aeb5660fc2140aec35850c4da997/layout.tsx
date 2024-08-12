import React from "react";
import AdminHeader from "@/custom-components/ui/(admin)/AdminHeader";

type LayoutProps = {
  children: React.ReactNode
}

export default function layout({children}: LayoutProps) {
  return (
    <>
      <AdminHeader/>
      {children}
    </>
  )
}