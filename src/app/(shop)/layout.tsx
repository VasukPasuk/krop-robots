import React from "react";
import {ThemeProvider} from "@/context/ThemeContext";
import Header from "@/custom-components/ui/Header/Header";
import {CssBaseline} from "@mui/material";

export default function Layout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <CssBaseline />
      <Header/>
      <main className="mt-[64px] main-container">
        {children}
      </main>
    </>
  );
}