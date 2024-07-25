'use client'

import React, {useContext} from 'react';
import './style.scss'
import {IoSunnyOutline} from "react-icons/io5";
import {LuMoon} from "react-icons/lu";
import {ThemeContext} from "@/context/ThemeContext";
import {TTheme} from "@/types";

function ThemeSwitcher() {
  const {theme, setTheme} = useContext(ThemeContext)
  const themeSwitcherHandler = () => {
    // @ts-ignore
    setTheme((prevTheme:TTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      const htmlElement = document.documentElement;
      htmlElement.setAttribute('data-theme', newTheme);
      return newTheme;
    })
  }
  return (
    <div
      id="theme-changer"
      onClick={themeSwitcherHandler}
      data-theme={theme}
    >
      <div
        className="theme-changer__circle"
      >
        {(theme === 'light') && <IoSunnyOutline className={`light-theme-icon theme-icon`}/>}
        {(theme === 'dark') && <LuMoon className={`dark-theme-icon theme-icon`}/>}
      </div>
    </div>
  );
}

export default ThemeSwitcher;