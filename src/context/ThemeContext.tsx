'use client'
import React, {createContext, FC, useState, ReactNode, useEffect} from "react";
import {TTheme, TThemeContext} from "@/types";
import {ToastContainer} from "react-toastify";


export const ThemeContext = createContext<TThemeContext | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<TTheme>('light');

  const value = {
    theme,
    setTheme,
  };

  useEffect(() => {
    document.documentElement.setAttribute("class", theme)
  }, [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
      <ToastContainer theme={theme} position="bottom-left"/>
    </ThemeContext.Provider>
  );
};
