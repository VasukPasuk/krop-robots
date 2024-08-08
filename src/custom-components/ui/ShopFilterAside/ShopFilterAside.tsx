'use client'
import React, {useState} from 'react';
import {Checkbox, FormControlLabel, FormGroup, FormLabel} from "@mui/material";

interface IShopFilterAsideProps {
  children?: React.ReactNode
}

interface IInitialState {
  "All": string,
  "Accessories": string,
  "Puzzles": string,
  "Toys": string,
}

const initialState:IInitialState = {
  "All": "All",
  "Accessories": "Accessories",
  "Puzzles": "Puzzles",
  "Toys": "Toys",
}

function ShopFilterAside() {
  const [checkbox, setCheckbox] = useState<keyof IInitialState>("All");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckbox(prev => event.target.name as keyof IInitialState);
  };


  return (
    <aside className="w-[320px] flex flex-col justify-center items-center">
      <FormGroup>
        <FormLabel component="div">Категорії</FormLabel>
        <div className="flex flex-col justify-center items-start pl-2 mt-2">
          <FormControlLabel control={<Checkbox onChange={handleChange} name={"All"} checked={checkbox === "All"} value={"All"} defaultChecked/>} label="Всі"/>
          <FormControlLabel control={<Checkbox onChange={handleChange} name={"Accessories"} checked={checkbox === "Accessories"} value={"Accessories"}/>} label="Аксесуари"/>
          <FormControlLabel control={<Checkbox onChange={handleChange} name={"Toys"} checked={checkbox === "Toys"} value={"Toys"}/>} label="Іграшки"/>
          <FormControlLabel control={<Checkbox onChange={handleChange} name={"Puzzles"} checked={checkbox === "Puzzles"} value={"Puzzles"}/>} label="Головоломки"/>
        </div>
      </FormGroup>
    </aside>
  )
}

export default ShopFilterAside