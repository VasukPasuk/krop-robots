import type {Metadata} from "next";
import {Inter, Roboto_Flex, Roboto_Mono} from "next/font/google";
import "@/styles/globals.scss";
import React from "react";
import {ThemeProvider} from "@/context/ThemeContext";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import {CssBaseline, StyledEngineProvider} from "@mui/material";
import "react-toastify/scss/main.scss"
import {TanStackProvider} from "@/app/TanstackWrapper";
import {Analytics} from "@vercel/analytics/react"

const inter = Inter({weight: ["100", "200", "300", "400", "500", "700", "800", "900"], subsets: ["latin", "cyrillic", "cyrillic", "cyrillic-ext"]});


export const metadata: Metadata = {
  title: "Krop Robots",
  description: 'Офіційний сайт ГО "Krop Robots"',
  keywords: "Krop Robots, STEM освіта, 3д-друкування, Arduino",
  category: "STEM",
  publisher: "Krop Robots",
  creator: "Krop Robots",
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
            <CssBaseline/>
            <body className={inter.className}>
            {children}
            </body>
          </ThemeProvider>
        </TanStackProvider>
      </StyledEngineProvider>
    </AppRouterCacheProvider>
    <Analytics/>
    </html>
  );
}


