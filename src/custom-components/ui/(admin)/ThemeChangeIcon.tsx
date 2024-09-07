import {MdSunny} from "react-icons/md";
import {IconButton} from "@mui/material";
import React, {useContext} from "react";
import {IoMdMoon} from "react-icons/io";
import {ThemeContext} from "@/context/ThemeContext";


export default function ThemeChangeIcon() {
  const {setTheme, theme} = useContext(ThemeContext);
  return (
    <IconButton onClick={() => setTheme((theme === "light" ? "dark" : "light"))} className={"bg-neutral-200/55 p-3"} aria-label="cart">
      {theme === "light" ? < MdSunny size={20}/> : <IoMdMoon size={20}/>}
    </IconButton>
  )
}
