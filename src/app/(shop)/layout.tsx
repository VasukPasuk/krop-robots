import React from "react";
import {ThemeProvider} from "@/context/ThemeContext";
import Header from "@/custom-components/ui/Header/Header";

export default function Layout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header/>
      {children}
    </>
  );
}