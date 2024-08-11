"use client"
import React, {useState} from "react";
import {Button, Input} from "@mui/material";
import {MdSearch} from "react-icons/md";

export function SearchInput() {
  const [value, setValue] = useState<string>("");
  const onInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValue(prev => event.target.value)
  };

  return (
    <div className="flex flex-row items-center justify-center gap-x-2 w-2/4">
      <Input className="w-full" placeholder="Пошук товару..." onChange={onInputChange} value={value}/>
      <Button className="normal-case text-[.85rem]" variant="contained"
              endIcon={<MdSearch className="text-2xl"/>}>
        Знайти
      </Button>
    </div>
  )
}