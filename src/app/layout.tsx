import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "@/styles/globals.scss";
import React from "react";
import {ThemeProvider} from "@/context/ThemeContext";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import {CssBaseline, StyledEngineProvider} from "@mui/material";
import "react-toastify/scss/main.scss"
import {TanStackProvider} from "@/app/TanstackWrapper";

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
          <TanStackProvider>
            <ThemeProvider>
              <CssBaseline />
              <body className={inter.className}>
              {children}
              </body>
            </ThemeProvider>
          </TanStackProvider>
        </StyledEngineProvider>
      </AppRouterCacheProvider>
    </html>
  );
}


