import React, {useContext} from "react";
import AdminDrawer from "@/custom-components/ui/(admin)/AdminDrawer";
import AdminNavBar from "@/custom-components/ui/(admin)/AdminNavBar";
import clsx from "clsx";
import {AdminLayoutProvider} from "@/context/AdminLayoutContext";

type LayoutProps = {
  children: React.ReactNode
}

export default function layout({children}: LayoutProps) {
  return (
    <main className={"flex flex-row"}>
      <AdminLayoutProvider>
        <div>
          <AdminDrawer/>
        </div>
        <div className={clsx("flex flex-col min-h-dvh w-full")}>
          <AdminNavBar/>
          <div className={"flex flex-col"}>
            {children}
          </div>
        </div>
      </AdminLayoutProvider>
    </main>
  )
}