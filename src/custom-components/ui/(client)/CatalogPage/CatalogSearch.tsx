"use client"
import {Button, FormControl, IconButton, Input, InputLabel, MenuItem, Select, TextField, Tooltip} from "@mui/material";
import {MdSearch} from "react-icons/md";
import {useState} from "react";

function CatalogSearch() {
  const [sort, setSort] = useState("")
  return (
    <nav className="h-16 rounded bg-black/5 flex items-center p-4 justify-between">
      <div className="flex items-center justify-center md:w-1/3 gap-x-2">
        <TextField size="small" className="w-full" label="Шукаю..."/>
        <div>
          <Tooltip title="Почати пошук">
            <Button variant="contained" size="large" sx={{ minWidth: 0 }}>
              <MdSearch className="text-2xl"/>
            </Button>
          </Tooltip>
        </div>
      </div>
      <div>
        <FormControl size="small" className="w-[25ch]">
          <InputLabel id="sort-label">Сортування</InputLabel>
          <Select
            labelId="sort-label"
            label="Сортування"
            onChange={e => setSort(_ => e.target.value as string)}
            MenuProps={{disableScrollLock: true}}
          >
            <MenuItem value={'new'}>Новинки</MenuItem>
            <MenuItem value={'rating'}>Рейтинг</MenuItem>
            <MenuItem value={'expensive-cheap'}>Від дорогих до дешевих</MenuItem>
            <MenuItem value={'cheap-expensive'}>Від дешевих до дорогих</MenuItem>
          </Select>
        </FormControl>
      </div>
    </nav>
  )
}

export default CatalogSearch