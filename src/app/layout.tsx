import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "@/styles/globals.scss";
import React from "react";
import {ThemeProvider} from "@/context/ThemeContext";
import Head from "next/head";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import {StyledEngineProvider} from "@mui/material";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Krop Robots",
  description: 'Офіційний сайт ГО "Krop Robots"',
};

interface PROPS {
  children: Readonly<React.ReactNode>;
}

export default function RootLayout({children}: PROPS) {
  return (
    <html lang="ua" data-theme="light">
      <AppRouterCacheProvider>
        <StyledEngineProvider injectFirst>
          <ThemeProvider>
            <body className={inter.className}>
            {children}
            </body>
          </ThemeProvider>
        </StyledEngineProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
