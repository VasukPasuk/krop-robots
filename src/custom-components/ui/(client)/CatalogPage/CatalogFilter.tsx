"use client"
import {useQueries} from "@tanstack/react-query";
import CategoryFetcher from "@/services/fetchers/CategoryFetcher";
import TagFetcher from "@/services/fetchers/TagFetcher";
import {Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import useCatalogFilters from "@/hooks/useQueryFilters";
import {useSpecialQueries} from "@/hooks/useSpecialQueries";
import {MdFilterList} from "react-icons/md";
import {IoIosArrowDown} from "react-icons/io";
import clsx from "clsx";

export type CheckboxArrayField = "selectedTags" | "selectedCategories"

type TypeFilterConfig = {
  maxPrice: number
  minPrice: number
  selectedTags: string[]
  selectedCategories: string[]
}

function CatalogFilter() {
  const {resetSearchQuery, setSearchQuery} = useCatalogFilters()
  const {maxPrice, minPrice} = useSpecialQueries()
  const [filterConfig, setFilterConfig] = useState<TypeFilterConfig>({
    maxPrice: 0,
    minPrice: 0,
    selectedTags: [],
    selectedCategories: [],
  })

  // DEBUG:
  console.log(filterConfig)


  const [categories, tags] = useQueries({
    queries: [
      {
        queryKey: ["categories"],
        queryFn: () => CategoryFetcher.getMany("limit=1000"),
      },
      {
        queryKey: ["tags"],
        queryFn: () => TagFetcher.getAllTags("limit=1000"),
      }
    ]
  })

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, mode: "max" | "min") => {
    const value = Number(event.target.value);
    if (Number(value) >= 0) {
      (mode === "max") ? (
        setFilterConfig(prev => ({...prev, maxPrice: value}))
      ) : (
        setFilterConfig(prev => ({...prev, minPrice: value}))
      )
    }
  };

  const checkFunction = (field: CheckboxArrayField, value: string) => {
    return filterConfig[field].includes(value)
  }

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const category_name = event.target.name;
    setFilterConfig(prev =>
      event.target.checked
        ? {...prev, selectedCategories: [...prev.selectedCategories, event.target.name]}
        : {...prev, selectedCategories: prev.selectedCategories.filter(name => name !== category_name)}
    );
  };

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tag_name = event.target.name;
    setFilterConfig(prev =>
      event.target.checked
        ? {...prev, selectedTags: [...prev.selectedTags, event.target.name]}
        : {...prev, selectedTags: prev.selectedTags.filter(name => name !== tag_name)}
    );
  };


  useEffect(() => {
    if ((minPrice >= maxPrice) && (minPrice && minPrice)) {
      toast.warn("Мінімальна ціна не може бути вищою за максимальну або дорівнювати їй!")
      setSearchQuery({
        maxPrice: null,
        minPrice: null,
      })
      setFilterConfig(prev => ({
        ...prev,
        maxPrice: 0,
        minPrice: 0,
      }))
    }
  }, [maxPrice, minPrice]);


  if (categories.isLoading || tags.isLoading) {
    return (
      <>
        Loading
      </>
    )
  }
  if (!categories.data || !tags.data) {
    return (
      <>
        Error
      </>
    )
  }

  const applyFiltersHandler = () => {
    setSearchQuery({
      maxPrice: filterConfig.maxPrice > 0 ? filterConfig.maxPrice : null,
      minPrice: filterConfig.minPrice > 0 ? filterConfig.minPrice : null,
      filterCategories: filterConfig.selectedCategories,
      filterTags: filterConfig.selectedTags,
    })
  }


  return (
    <div className="flex flex-col gap-y-2 p-2">
      <div className="flex items-center justify-between mb-2 ">
        <h4 className="text-2xl"> Фільтри </h4>
        <div
          className="flex items-center gap-x-1 p-1 bg-red-200 rounded text-sm hover:bg-red-300 transition-colors duration-500 cursor-pointer"
          onClick={() => resetSearchQuery()}
        >
          <MdFilterList/>
          <span>Скинути</span>
        </div>
      </div>
      <OptionsList
        config={{
          title: "Категорії",
          checkFunction,
          handler: handleCategoryChange,
          items: categories.data.items.map((category) => ({value: category.name, name: category.name})),
          field: "selectedCategories",
        }}
      />
      <OptionsList
        config={{
          title: "Теги",
          checkFunction,
          handler: handleTagChange,
          items: tags.data.items.map((tag) => ({value: tag.name, name: tag.name})),
          field: "selectedTags",
        }}
      />
      <div className="flex flex-col gap-y-4">
        <TextField
          label="Мін"
          type="number"
          value={filterConfig.minPrice}
          onChange={(event) => handlePriceChange(event, "min")}
          size="small"
        />
        <TextField
          label="Макс"
          type="number"
          value={filterConfig.maxPrice}
          onChange={(event) => handlePriceChange(event, "min")}
          size="small"
        />
      </div>
      <div className="flex mt-4 justify-end">
        <Button
          onClick={applyFiltersHandler}
          variant="contained"
          className="normal-case"
          endIcon={<MdFilterList/>}
          color="success"
        >
          Застосувати
        </Button>
      </div>
    </div>
  )
}


interface IOptionsList {
  config: {
    items: {
      value: string
      name: string
    }[]
    field: CheckboxArrayField
    title: string
    handler: (event: React.ChangeEvent<HTMLInputElement>) => void
    checkFunction: (field: CheckboxArrayField, value: string) => boolean
  }
}

function OptionsList({config}: IOptionsList) {
  const [active, setActive] = useState<boolean>(true)
  const {handler, checkFunction} = config;

  return (
    <div className="flex flex-col">
      <div
        onClick={() => setActive(prev => !prev)}
        className={clsx("flex flex-row items-center justify-start gap-x-2 p-1 rounded hover:bg-black/10 transition-colors duration-300 cursor-pointer", {
          "bg-black/5": active,
        })}>
        <IoIosArrowDown/>
        <span>
            {config.title}
          </span>
      </div>

      <ul className={clsx("flex flex-col overflow-hidden transition duration-500 box-border", {
        "max-h-96": active,
        "max-h-0": !active
      })}>
        {config.items.map(item => (
          <li className="pl-2">
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handler}
                  checked={checkFunction(config.field, item.value)}
                  name={item.name}
                  value={item.value}
                />
              }
              label={item.name}
            />
          </li>
        ))}
      </ul>
    </div>


  )
}


export default CatalogFilter;