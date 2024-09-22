"use client"
import {Autocomplete, Button, TextField} from "@mui/material";
import React, {useContext} from "react";
import {CreateProductContext} from "@/context/CreateProductContext";
import {useQueries} from "@tanstack/react-query";
import CategoryFetcher from "@/services/fetchers/CategoryFetcher";
import TagFetcher from "@/services/fetchers/TagFetcher";

export default function CreateProductPage_ProductForm() {
  const {productData, stateFn, setProductData, post} = useContext(CreateProductContext)

  const onSelectCategoryHandler = (event: React.SyntheticEvent, value: string) => {
    stateFn(prevState => ({...prevState, category_name: value}))
  }



  const [categoryQuery, tagQuery] = useQueries({
    queries: [
      {
        queryKey: ["categories"],
        queryFn: () => CategoryFetcher.getMany()
      },
      {
        queryKey: ["tags"],
        queryFn: () => TagFetcher.getAllTags()
      },
    ]
  })

  if (categoryQuery.isLoading || tagQuery.isLoading) {
    return (
      <>
        Loading...
      </>
    )
  }

  if (categoryQuery.isError || tagQuery.isError) {
    return (
      <>
        Loading...
      </>
    )
  }

  const namesOfCategories = categoryQuery.data.items.map((category) => category.name)
  const namesOfTags = tagQuery.data.items.map((tag) => tag.name)

  return (
    <div className={"flex flex-col gap-4 lg:w-1/2"}>
      <TextField value={productData.name}
                 onChange={(e) => stateFn(prevState => ({...prevState, name: e.target.value}))} required
                 className={"col-span-full"} label={"Назва"}/>
      <TextField value={productData.description}
                 onChange={(e) => stateFn(prevState => ({...prevState, description: e.target.value}))} required
                 className={"col-span-full"} multiline rows={8} label={"Опис"}/>
      <Autocomplete onChange={onSelectCategoryHandler} className={"col-span-4"}
                    renderInput={(params) => <TextField required {...params} label="Категорія"/>}
                    options={namesOfCategories}/>
      <Autocomplete
        multiple
        id="tags-standard"
        options={namesOfTags}
        getOptionLabel={(option) => option}
        onChange={(event, value, reason, details) => setProductData({tags: value })}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Теги"
          />
        )}
      />
      <div className={"col-span-12 flex justify-end p-4"}>
        <Button variant={"contained"} color={"success"} onClick={() => post()}>
          Створити
        </Button>
      </div>
    </div>
  )
};