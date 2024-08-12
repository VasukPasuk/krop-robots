import React from "react";
import Header from "@/custom-components/ui/Header/Header";
import Footer from "@/custom-components/ui/Footer/Footer";
import Image from "next/image";
export default function Layout({children}: Readonly<{ children: React.ReactNode}>) {
  return (
    <>
      <Header srcLogo={"/logo_shop_white_upper.png"} className="bg-blue-700 dark:bg-yellow-600"/>
        {children}
      {/*<Image width={500} height={500} alt={"fdgfdgfd"} src={"https://drive.google.com/uc?export=view&id=1b2qFcSrDE_8XODOpISUOUOluqTljDNNx"}></Image>*/}
      <Footer/>
    </>
  );
}