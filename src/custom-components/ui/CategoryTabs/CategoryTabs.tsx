"use client"
import React, {useEffect, useState} from 'react';
import {CircularProgress, Tab, Tabs} from "@mui/material";
import {TabOwnProps} from "@mui/material/Tab/Tab";
import {notFound, useRouter, useSearchParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {Category} from "@prisma/client";

interface ICategoryTabsProps {
  categories: Category[]
}



function CategoryTabs({categories}: ICategoryTabsProps) {
  const searchParams = useSearchParams();
  const [value, setValue] = useState<string | 'Всі'>(searchParams.get("category") || 'Всі');
  const router = useRouter();
  const handleChange = (event: React.SyntheticEvent, value: string) => {
    setValue(prev => value)
    if (value !== "Всі") router.push(`/shop/products?category=${value}`)
    else router.push(`/shop/products`);
  };

  useEffect(() => {
    setValue(searchParams.get("category") || 'Всі')
  }, [searchParams.get("category")])

  return (
    <div className="flex flex-row  items-center w-full">
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label={"Всі"} value={"Всі"}/>
        {
          categories.map(({name}) => (
            <Tab label={name} value={name}/>
          ))
        }
      </Tabs>
    </div>
  )
}

export default CategoryTabs