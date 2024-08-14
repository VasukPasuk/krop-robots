"use client"
import React, {useEffect, useState} from "react";
import {Button, Input} from "@mui/material";
import {MdSearch} from "react-icons/md";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {toast} from "react-toastify";

export function SearchInput() {
  const [value, setValue] = useState<string>("");
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const onInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValue(prev => event.target.value)
  };

  const onSearchButtonHandler = () => {
    if (value.trim() !== "") router.push(pathname + `?search=${value}` + (!!window.location.search ? window.location.search.replace("?", "&") : ""), {scroll: false})
    else router.push("/shop/products")
  }

  useEffect(() => {
    setValue("")
  }, [searchParams.get("category")]);

  return (
    <div className="flex flex-row items-center justify-center gap-x-2 md:w-2/4">
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