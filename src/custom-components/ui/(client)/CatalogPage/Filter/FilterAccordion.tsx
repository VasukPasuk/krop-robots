"use client"

import React, {useContext, useState} from "react";
import {Checkbox, FormControlLabel} from "@mui/material";
import {FaArrowDown} from "react-icons/fa6";
import {IoIosArrowDown} from "react-icons/io";
import {FilterContext} from "@/context/FilterContext";


interface IFilterAccordionProps {
  children: React.ReactNode;
}

function FilterAccordion({children}: IFilterAccordionProps) {
  return (
    <div className="flex flex-col gap-y-2">
      {children}
    </div>
  )
}

interface IAccordionItemProps {
  title: React.ReactNode
  body: React.ReactNode
}

function AccordionItem({body, title}: IAccordionItemProps) {
  const [active, setActive] = useState<boolean>(false)
  return (
    <div className="flex flex-col flex-1">
      <span onClick={() => setActive(prev => !prev)}>
        {title}
      </span>
      {active && body}
    </div>
  )
}

interface IAccordionTitleProps {
  children: React.ReactNode;
}

function AccordionTitle({children}: IAccordionTitleProps) {
  return (
    <div className="flex gap-x-2 items-center justify-start cursor-pointer">
      <div className="p-1 rounded bg-black/10">
        <IoIosArrowDown/>
      </div>
      <span>
        {children}
      </span>
    </div>
  )
}


interface IAccordionTitleProps {
  children: React.ReactNode;
}

function AccordionBody({children}: IAccordionTitleProps) {
  return (
    <ul className="flex flex-col flex-1 ml-8 border-l border-gray-200 border-solid">
      {children}
    </ul>
  )
}


interface IAccordionOptionProps {
  name: string;
}

function AccordionOption({name}: IAccordionOptionProps) {
  const {selectedCategories, handleCategoryChange} = useContext(FilterContext)
  return (
    <li  className="pl-2">
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedCategories.includes(name)}
            onChange={handleCategoryChange}
            name={name}
          />
        }
        label={name}
      />
    </li>
  )
}


export default Object.assign(FilterAccordion, {
  Title: AccordionTitle,
  Body: AccordionBody,
  Option: AccordionOption,
  Item: AccordionItem,
})




