'use client'
import { createContext, FC, useState, ReactNode } from "react";
import {TTheme, TThemeContext} from "@/types";


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

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
