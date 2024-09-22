'use client'


import React, {useCallback, useContext, useState} from "react";
import {
  Autocomplete,
  Button,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select, SelectChangeEvent,
  TextField, Tooltip
} from "@mui/material";
import {MdAdd, MdRemove} from "react-icons/md";
import {useMutation, useQuery} from "@tanstack/react-query";
import {axiosWithAuth} from "@/services/axios/axios.interceptors";
import {Category, IAProductFormData} from "@/interfaces";
import "./index.scss"
import {IoTrashBin} from "react-icons/io5";
import {toast} from "react-toastify";
import {CreateProductContext} from "@/context/CreateProductContext";

const BooleanDictionary = {"true": true, "false": false}

const InitStateData: IAProductFormData = {
  photos: [],
  name: "",
  category_name: "",
  description: "",
  tags: [],
  variants: [],
}

function CreateProductForm() {
  const {productData, setProductData, stateFn} = useContext(CreateProductContext)
  const addImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as unknown as File[];
    if (files.length === 0) return;
    let filesToArray:File[] = [];
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') continue;
      if (productData.photos.some((e) => e.name === files[i].name)) continue;
      filesToArray.push(files[i]);
    }
    setProductData({photos: filesToArray})
  }

  const removeImageHandler = (img_index: number) => () => {
    stateFn(prevState => ({...prevState, photos: prevState.photos.filter((_, index) => index !== img_index)}))
  }

  const onSelectCategoryHandler = (event: React.SyntheticEvent, value: string) => {
    stateFn(prevState => ({...prevState, category_name: value}))
  }

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    productMutate.mutate()
  }


  const productMutate = useMutation({
    mutationFn: async () => {
      try {
        const reqFormData = new FormData();
        Object.keys(InitStateData).forEach((key: string) => {
          if (key === 'photos') {
            productData.photos.forEach((photo, index) => {
              reqFormData.append('photos', photo, `photo_${index}.jpg`);
            });
          } else {
            reqFormData.append(key, productData[key]);
          }
        });

        const result = await axiosWithAuth.post("products", reqFormData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return result.data;
      } catch (error) {
        throw new Error("Something went wrong.");
      }
    },
    onSuccess: () => {
      stateFn(InitStateData)
      toast.success("Продукт успішно створено.");
    },
    onError: (error) => {
      toast.error(`Повідомлення помилки: ${error.message}`);
    }
  });


  const {data, isLoading, isFetched, error, isError} = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        return (await axiosWithAuth.get<{
          items: Category[],
          count: number
        }>("/categories?select_only=name&limit=1000")).data;
      } catch (error) {
        throw new Error(error.message)
      }
    },
  })


  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!data || !data.items) return <p>No data available</p>;

  const categoriesNames = data.items.map((item) => item.name)

  return (
    // <form className={"flex flex-1 lg:flex-row flex-col gap-4 w-full"} onSubmit={onSubmitHandler}>


    // </form>
  )
}

export default CreateProductForm