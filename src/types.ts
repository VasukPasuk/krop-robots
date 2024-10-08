export type TTheme = 'dark' | 'light';

export type TThemeContext = {
  theme: TTheme;
  setTheme: (theme: TTheme) => void;
};

export type TPlastic = "PLA" | "CoPET"