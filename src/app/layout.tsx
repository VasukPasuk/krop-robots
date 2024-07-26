import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.scss";
import React from "react";
import {ThemeProvider} from "@/context/ThemeContext";
import Head from "next/head";

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
    <Head>
      <title> Krop Robots </title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta name="description" content="Офіційна сторінка ГО 'Krop Robots'"/>
    </Head>
    <ThemeProvider>
      <body className={inter.className}>
      {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
