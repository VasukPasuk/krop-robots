import React from "react";
import {ThemeProvider} from "@/context/ThemeContext";
import Header from "@/custom-components/ui/Header/Header";
import {CssBaseline} from "@mui/material";
import Footer from "@/custom-components/ui/Footer/Footer";

export default function Layout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <CssBaseline />
      <Header/>
      <main className="mt-[64px] flex flex-col min-h-[90dvh]">
        {children}
      </main>
      <Footer className={"mt-6"}/>
    </>
  );
}