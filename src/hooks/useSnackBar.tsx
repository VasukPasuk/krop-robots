"use client"
import {useState} from "react";

export default function useSnackBar() {
  const [active, setActiveSnackBar] = useState<boolean>(false);

  const close = () => {
    setActiveSnackBar(false)
  }
  const open = () => {
    setActiveSnackBar(true)
  }

  return {
    active,
    close,
    open
  }
}
