import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.scss";
import React from "react";
import {ThemeProvider} from "@/context/ThemeContext";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Krop Robots",
};

interface PROPS {
  children: Readonly<React.ReactNode>;
}

export default function RootLayout({children}:PROPS) {
  return (
    <html lang="ua" data-theme="light">
      <ThemeProvider>
        <body className={inter.className}>
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
