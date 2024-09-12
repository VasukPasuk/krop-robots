"use client"

import {Button, Checkbox, FormControlLabel, FormGroup, Paper, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useQueries} from "@tanstack/react-query";
import CategoryFetcher from "@/services/fetchers/CategoryFetcher";
import TagFetcher from "@/services/fetchers/TagFetcher";
import {MdFilterList} from "react-icons/md";
import useCatalogFilters from "@/hooks/useCatalogFilters";

function CatalogFilter() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [priceError, setPriceError] = useState('');

  const {appendSearchQuery} = useCatalogFilters();

  const [categories, tags] = useQueries({
    queries: [
      {
        queryKey: ["categories"],
        queryFn: () => CategoryFetcher.getMany(),
      },
      {
        queryKey: ["tags"],
        queryFn: () => TagFetcher.getAllTags("limit=1000"),
      }
    ]
  })

  const handleCategoryChange = (event) => {
    const category_name = event.target.name;
    setSelectedCategories(prev =>
      event.target.checked
        ? [...prev, category_name]
        : prev.filter(name => name !== category_name)
    );
  };

  const handleTagChange = (event) => {
    const tag_name = event.target.name;
    setSelectedTags(prev =>
      event.target.checked
        ? [...prev, tag_name]
        : prev.filter(name => name !== tag_name)
    );
  };


  const handlePriceChange = (setter) => (event) => {
    const value = event.target.value;
    if (value === '' || (Number(value) >= 0)) {
      setter(value);
    }
  };

  const applyFiltersHandler = () => {
    appendSearchQuery({
      maxPrice: parseInt(maxPrice),
      minPrice: parseInt(minPrice),
      filterCategories: selectedCategories,
      filterTags: selectedTags,
    })
  }

  useEffect(() => {
    if (minPrice !== '' && maxPrice !== '') {
      if (Number(maxPrice) < Number(minPrice)) {
        setPriceError('Максимальна ціна не може бути меншою за мінімальну');
      } else {
        setPriceError('');
      }
    } else {
      setPriceError('');
    }
  }, [minPrice, maxPrice]);


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

  return (
    <Paper component="aside" className="md:w-64 rounded sticky top-4 p-4 space-y-4">
      <Typography variant="h6" className="font-bold">Фільтри</Typography>

      <div>
        <Typography variant="subtitle1" className="font-semibold mb-2">Категорії</Typography>
        <FormGroup>
          {categories.data.items.map(category => (
            <FormControlLabel
              key={category.id}
              control={
                <Checkbox
                  checked={selectedCategories.includes(category.name)}
                  onChange={handleCategoryChange}
                  name={category.name}
                />
              }
              label={category.name}
            />
          ))}
        </FormGroup>
      </div>

      <div>
        <Typography variant="subtitle1" className="font-semibold mb-2">Теги</Typography>
        <FormGroup>
          {tags.data.items.map(tag => (
            <FormControlLabel
              key={tag.id}
              control={
                <Checkbox
                  checked={selectedTags.includes(tag.name)}
                  onChange={handleTagChange}
                  name={tag.name}
                />
              }
              label={tag.name}
            />
          ))}
        </FormGroup>
      </div>

      <div>
        <Typography variant="subtitle1" className="font-semibold mb-2">Ціна</Typography>
        <div className="flex flex-col space-y-2">
          <TextField
            label="Мін"
            type="number"
            value={minPrice}
            onChange={handlePriceChange(setMinPrice)}
            size="small"
            error={!!priceError}
          />
          <TextField
            label="Макс"
            type="number"
            value={maxPrice}
            onChange={handlePriceChange(setMaxPrice)}
            size="small"
            error={!!priceError}
          />
          {priceError && (
            <Typography color="error" variant="caption">
              {priceError}
            </Typography>
          )}
        </div>
      </div>

      <div className={"flex justify-end"}>
        <Button
          onClick={applyFiltersHandler}
          variant="contained"
          className="normal-case"
          endIcon={<MdFilterList/>}
        >
          Застосувати
        </Button>
      </div>
    </Paper>
  )
}

export default CatalogFilter;