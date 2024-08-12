import React from "react";
import ManagamentTabs from "@/app/(admin)/d033e22ae348aeb5660fc2140aec35850c4da997/admin/managament/ManagamentTabs";

type LayoutProps = {
  children: React.ReactNode
}

export default function layout({children}: LayoutProps) {
  return (
    <div className={"w-full flex flex-col"}>
      <ManagamentTabs/>
      {children}
    </div>
  )
}