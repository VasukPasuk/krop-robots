'use client'
import React, {useEffect, useState} from 'react';
import {Checkbox, CircularProgress, FormControlLabel, FormGroup, FormLabel} from "@mui/material";
import { CategoriesCheckBoxData, CategoriesCheckBoxDataObj } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {Category} from "@prisma/client";

interface IShopFilterAsideProps {
  children?: React.ReactNode;
}



function ShopFilterAside() {

  const { data, error, status, isError, isFetched, isLoading} = useQuery({
    queryKey: ["categories"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      return await (await fetch("/api/categories")).json() as Category[];
    },
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-64 h-32">
        <CircularProgress />
      </div>
    )
  }

  if (!data && !isFetched) {
    return (
      <div>
        No data
      </div>
    )
  }

  return (
    <aside className="w-[320px] flex flex-col justify-start items-center pt-4">
      <FilterList data={data}/>
    </aside>
  );
}

export default ShopFilterAside;


function FilterList({data}:{data: Category[]}) {
  const [currentCategory, setCurrentCategory] = useState<string | "Всі">("Всі")
  const [categories, setCategories] = useState<Category[]>(data || [])
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
    const categoryName = event.target.value;
    setCurrentCategory(categoryName)
    if (categoryName !== "Всі") {
      router.push(`/shop/products/?category=${categoryName}`);
    } else {
      router.push(`/shop/products`);
    }
  };
  return (
    <FormGroup>
      <FormLabel component="div">Категорії</FormLabel>
      <div className="flex flex-col justify-center items-start pl-2 mt-2">
        <FormControlLabel
          control={
            <Checkbox
              onChange={handleChange}
              name={"Всі"}
              checked={currentCategory == "Всі"}
              value={"Всі"}
              defaultChecked
            />
          }
          label={"Всі"}
        />
        {categories.map(({name, id}) => (
          <FormControlLabel
            key={id}
            control={
              <Checkbox
                onChange={handleChange}
                name={name}
                checked={currentCategory == name}
                value={name}
              />
            }
            label={name}
          />
        ))}
      </div>
    </FormGroup>
  )
}