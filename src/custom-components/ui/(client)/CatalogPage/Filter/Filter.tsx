"use client"
import FilterAccordion from "@/custom-components/ui/(client)/CatalogPage/Filter/FilterAccordion";
import React, {useContext, useState} from "react";
import {FilterContext, FilterProvider} from "@/context/FilterContext";
import {MdClose, MdFilterList} from "react-icons/md";
import {Button, Divider, TextField} from "@mui/material";
import {useMediaQuery} from "@mui/system";


interface IFilterProps {
  children: React.ReactNode;
}

function Filter({children}: IFilterProps) {
  const {applyFiltersHandler, resetFilterHandler, handlePriceChange, maxPrice, minPrice} = useContext(FilterContext);
  return (
    <div className="flex flex-col flex-1 w-full shadow px-6 py-4 gap-y-4">
      <div className="flex items-center justify-between mb-2 ">
        <h4 className="text-2xl"> Фільтри </h4>
        <div
          className="flex items-center gap-x-1 p-1 bg-red-200 rounded text-sm hover:bg-red-300 transition-colors duration-500 cursor-pointer"
          onClick={() => resetFilterHandler()}
        >
          <MdFilterList/>
          <span>Скинути</span>
        </div>
      </div>
      <Divider className="mb-4"/>
      <div className="flex flex-col flex-1">
        {children}
      </div>
      <div className="flex flex-col gap-y-4">
        <TextField
          label="Мін"
          type="number"
          value={minPrice}
          onChange={(e) => handlePriceChange(e, "min")}
          size="small"
        />
        <TextField
          label="Макс"
          type="number"
          value={maxPrice}
          onChange={(e) => handlePriceChange(e, "max")}
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

interface IFilterAsideProps {
  children: React.ReactNode;
}

function FilterAside({children}: IFilterAsideProps) {
  return (
    <FilterProvider>
      <Filter>
        {children}
      </Filter>
    </FilterProvider>
  )
}

export default Object.assign(FilterAside, {
  Accordion: FilterAccordion
})