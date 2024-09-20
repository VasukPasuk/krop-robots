"use client"
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip
} from "@mui/material";
import {MdSearch} from "react-icons/md";
import {useState} from "react";
import useCatalogFilters, {TypeSort} from "@/hooks/useQueryFilters";
import {IoMdClose} from "react-icons/io";

function CatalogSearch() {
  const [search, setSearch] = useState<string>("");
  const {appendSearchQuery, setSearchQuery} = useCatalogFilters();
  const setTypeSort = (type: TypeSort) => {
    appendSearchQuery({typeSort: type})
  }

  const onClickHandler = () => {
    setSearchQuery({
      searchField: "name",
      searchValue: search,
    })
  }

  return (
    <nav className="
      flex flex-col justify-start gap-y-2 s480:gap-y-0 s480:flex-row items-center s480:gap-x-2 s480:justify-between
      shadow rounded p-3
    ">
      <div className="flex items-center justify-start w-full md:w-1/3 gap-x-2">
        <div className="w-full flex relative items-center">
          <TextField
            size="small"
            className="w-full"
            label="Шукаю..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div
            className="absolute right-1 p-1 hover:bg-black/5 rounded transition-colors duration-400"
            onClick={() => setSearch("")}
          >
            <IoMdClose/>
          </div>
        </div>
        <div>
          <Tooltip title="Почати пошук">
            <Button variant="contained" size="large" sx={{ minWidth: 0 }} onClick={onClickHandler}>
              <MdSearch className="text-2xl"/>
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-1 w-full justify-end">
        <FormControl size="small" className="s480:w-[25ch] w-full">
          <InputLabel id="sort-label">Сортування</InputLabel>
          <Select
            labelId="sort-label"
            label="Сортування"
            onChange={e => setTypeSort(e.target.value as TypeSort)}
            MenuProps={{disableScrollLock: true}}
          >
            <MenuItem value={'new'}>Новинки</MenuItem>
            <MenuItem value={'rating'}>Рейтинг</MenuItem>
            <MenuItem value={'expensive_cheap'}>Від дорогих до дешевих</MenuItem>
            <MenuItem value={'cheap_expensive'}>Від дешевих до дорогих</MenuItem>
          </Select>
        </FormControl>
      </div>
    </nav>
  )
}

export default CatalogSearch