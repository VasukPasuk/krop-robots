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
import useCatalogFilters, {TypeSort} from "@/hooks/useCatalogFilters";

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
    <nav className="h-16 flex items-center py-2 justify-between border-b-[1px] border-solid border-b-neutral-200 pb-8">
      <div className="flex items-center justify-center md:w-1/3 gap-x-2">
        <TextField
          size="small"
          className="w-full"
          label="Шукаю..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <div>
          <Tooltip title="Почати пошук">
            <Button variant="contained" size="large" sx={{ minWidth: 0 }} onClick={onClickHandler}>
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