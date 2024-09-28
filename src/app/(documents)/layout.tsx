import React from "react";
import Header from "@/custom-components/ui/Header/Header";
import Footer from "@/custom-components/ui/Footer/Footer";

function Layout({children}:{children: Readonly<React.ReactNode>}) {
  return (
    <>
      <Header/>
      {children}
      <Footer/>
    </>
  )
}

export default Layout;