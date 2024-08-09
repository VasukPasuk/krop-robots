import React from "react";
import Header from "@/custom-components/ui/Header/Header";
import Footer from "@/custom-components/ui/Footer/Footer";

export default function Layout({children}: Readonly<{ children: React.ReactNode}>) {
  return (
    <>
      <Header className="bg-blue-700 dark:bg-yellow-600"/>
        {children}
      <Footer className={"mt-6"}/>
    </>
  );
}