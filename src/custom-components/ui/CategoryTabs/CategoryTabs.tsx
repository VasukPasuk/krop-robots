"use client"
import React, {useState} from 'react';
import {CircularProgress, Tab, Tabs} from "@mui/material";
import {TabOwnProps} from "@mui/material/Tab/Tab";
import {notFound, useRouter, useSearchParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {Category} from "@prisma/client";

interface ICategoryTabsProps {}



function CategoryTabs(props: ICategoryTabsProps) {
  const [value, setValue] = useState<string | 'Всі'>('Всі');
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, value: string) => {
    setValue(prev => value)
    if (value !== "Всі") router.push(`/shop/products?category=${value}`)
    else router.push(`/shop/products`);
  };



  const { data, error, status, isError, isFetched, isLoading} = useQuery({
    queryKey: ["categories"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      return await (await fetch("/api/categories")).json() as Category[];
    },
  })

  if (!isFetched && isLoading) {
    return (
      <div className="flex flex-row items-center justify-center w-full py-6">
        <CircularProgress />
      </div>
    )
  }

  if (!data && error && isFetched) {
    notFound()
  }

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
          data.map(({name}) => (
            <Tab label={name} value={name}/>
          ))
        }
      </Tabs>
    </div>
  )
}

export default CategoryTabs