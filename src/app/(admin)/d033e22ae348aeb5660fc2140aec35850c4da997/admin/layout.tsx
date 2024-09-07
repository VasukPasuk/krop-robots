import React from "react";
import AdminDrawer from "@/custom-components/ui/(admin)/AdminDrawer";
import AdminNavBar from "@/custom-components/ui/(admin)/AdminNavBar";

type LayoutProps = {
  children: React.ReactNode
}

export default function layout({children}: LayoutProps) {
  return (
    <main className={"flex flex-row"}>
      <AdminDrawer/>
      <div className="flex flex-col min-h-dvh w-full">
        <AdminNavBar/>
        <div className={"border-t-[1px] md:ml-72 border-t-neutral-300 border-solid flex flex-col md:p-6"}>
          {children}
        </div>
      </div>
    </main>
  )
}