"use client"
import React, {useState} from "react";
import {Button, Input} from "@mui/material";
import {MdSearch} from "react-icons/md";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {toast} from "react-toastify";

export function SearchInput() {
  const [value, setValue] = useState<string>("");
  const onInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValue(prev => event.target.value)
  };

  const pathname = usePathname()
  const router = useRouter()
  const onSearchButtonHandler = () => {
    if (value.trim() !== "") router.push(pathname + `?search=${value}` + (!!window.location.search ? window.location.search.replace("?", "&") : ""), {scroll: false})
    else toast.warning("Поле пошуку за іменем не повинно бути пустим!")
  }

  return (
    <div className="flex flex-row items-center justify-center gap-x-2 w-2/4">
      <Input className="w-full" placeholder="Пошук товару..." onChange={onInputChange} value={value}/>
      <Button
        className="normal-case text-[.85rem]"
        variant="contained"
        endIcon={<MdSearch className="text-2xl"/>}
        onClick={onSearchButtonHandler}
      >
        Знайти
      </Button>
    </div>
  )
}