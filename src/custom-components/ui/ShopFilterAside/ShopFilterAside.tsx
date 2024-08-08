'use client'
import React, {useState} from 'react';
import {Checkbox, FormControlLabel, FormGroup, FormLabel} from "@mui/material";
import {CategoriesCheckBoxData} from "@/constants";

interface IShopFilterAsideProps {
  children?: React.ReactNode
}

interface IInitialState {
  "All": string,
  "Accessories": string,
  "Puzzles": string,
  "Toys": string,
}

const initialState: IInitialState = {
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
    <aside className="w-[320px] flex flex-col justify-start items-center pt-4">
      <FormGroup>
        <FormLabel component="div">Категорії</FormLabel>
        <div className="flex flex-col justify-center items-start pl-2 mt-2">
          {CategoriesCheckBoxData.map(({label, name}, idx) => (
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleChange}
                  name={name}
                  checked={checkbox === name}
                  value={name}
                  defaultChecked={name === "All"}
                  key={name}
                />
              } label={label}/>
          ))}
        </div>
      </FormGroup>
    </aside>
  )
}

export default ShopFilterAside