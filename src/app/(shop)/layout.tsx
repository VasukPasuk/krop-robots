import React from "react";
import Header from "@/custom-components/ui/Header/Header";
import Footer from "@/custom-components/ui/Footer/Footer";
import AppBar from "@/custom-components/ui/(client)/AppBar";

export default function Layout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header srcLogo={"/logo_shop_white_upper.png"} className="bg-blue-700 dark:bg-yellow-600"/>
      <AppBar/>
      {children}
      <Footer/>
    </>
  );
}