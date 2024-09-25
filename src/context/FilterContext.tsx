'use client'
import React, {createContext, FC, useState, ReactNode, ChangeEvent, useEffect} from "react";
import useCatalogFilters from "@/hooks/useQueryFilters";
import {toast} from "react-toastify";
import {useSpecialQueries} from "@/hooks/useSpecialQueries";

type TypeFilterConfig = {
  maxPrice: number
  minPrice: number
  selectedTags: string[]
  selectedCategories: string[]
}

type FilterContext = {
  // setTag: React.Dispatch<React.SetStateAction<TypeFilterConfig>>,
  // setCategories: React.Dispatch<React.SetStateAction<TypeFilterConfig>>,
  handleCategoryChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleTagChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handlePriceChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, mode: "max" | "min") => void
  applyFiltersHandler: () => void,
  resetFilterHandler: () => void,
} & TypeFilterConfig

export const FilterContext = createContext<FilterContext | undefined>(undefined);


interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider: FC<FilterProviderProps> = ({children}) => {
  const [filterConfig, setFilterConfig] = useState<TypeFilterConfig>({
    maxPrice: 0,
    minPrice: 0,
    selectedTags: [],
    selectedCategories: [],
  })

  const {resetSearchQuery, setSearchQuery} = useCatalogFilters()
  const {maxPrice, minPrice} = useSpecialQueries()


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


  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>, mode: "max" | "min") => {
    const value = Number(event.target.value);
    if (!isNaN(value) || (Number(value) >= 0)) {
      (mode === "max") ? (
        setFilterConfig(prev => ({...prev, maxPrice: value}))
      ) : (
        setFilterConfig(prev => ({...prev, minPrice: value}))
      )
    }
  };

  const applyFiltersHandler = () => {
    setSearchQuery({
      maxPrice: Boolean(filterConfig.maxPrice) ? filterConfig.maxPrice : null,
      minPrice: Boolean(filterConfig.minPrice) ? filterConfig.minPrice : null,
      filterCategories: filterConfig.selectedCategories,
      filterTags: filterConfig.selectedTags,
    })
  }

  const resetFilterHandler = () => {
    resetSearchQuery()
  }

  useEffect(() => {
    if (minPrice > maxPrice) {
      toast.warn("Мінімальна ціна не може бути вищою за максимальну!")
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


  return (
    <FilterContext.Provider value={{
      ...filterConfig,
      handleCategoryChange,
      handleTagChange,
      handlePriceChange,
      applyFiltersHandler,
      resetFilterHandler,
    }}>
      {children}
    </FilterContext.Provider>
  );
};
