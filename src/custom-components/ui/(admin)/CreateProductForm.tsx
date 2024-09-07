'use client'


import React, {useCallback, useState} from "react";
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
import Image from "next/image";
import {MdAdd, MdRemove} from "react-icons/md";
import {useMutation, useQuery} from "@tanstack/react-query";
import {axiosWithAuth} from "@/services/axios/axios.interceptors";
import {Category, IAProductFormData} from "@/interfaces";
import "./index.scss"
import {IoTrashBin} from "react-icons/io5";
import {toast} from "react-toastify";

const BooleanDictionary = {"true": true, "false": false}

const InitStateData: IAProductFormData = {
  photos: [],
  name: "",
  category_name: "",
  discount: 0,
  description: "",
  // tags: [],
}

function CreateProductForm() {
  const [formData, setFormData] = useState<IAProductFormData>(InitStateData)

  const addImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as unknown as File[];
    if (files.length === 0) return;
    let filesToArray = [];
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') continue;
      if (formData.photos.some((e) => e.name === files[i].name)) continue;
      filesToArray.push(files[i]);
    }
    setFormData(prevState => ({...prevState, photos: [...prevState.photos, ...filesToArray]}))
  }

  const removeImageHandler = (img_index: number) => () => {
    setFormData(prevState => ({...prevState, photos: prevState.photos.filter((_, index) => index !== img_index)}))
  }

  const onSelectCategoryHandler = (event: React.SyntheticEvent, value: string) => {
    setFormData(prevState => ({...prevState, category_name: value}))
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
            formData.photos.forEach((photo, index) => {
              reqFormData.append('photos', photo, `photo_${index}.jpg`);
            });
          } else {
            reqFormData.append(key, formData[key]);
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
      setFormData(InitStateData)
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
    <form className={"grid grid-cols-12 items-start gap-4 w-full"} onSubmit={onSubmitHandler}>
      <div className={"col-span-6 grid grid-cols-12 gap-4 auto-rows-[250px]"}>
        {formData.photos.map((image: File, index) => (
          <Paper key={index} className={"added-image-slot col-span-4 bg-black/10 relative rounded-lg overflow-hidden"}>
            <Image fill alt={"product image"} src={URL.createObjectURL(image)}/>
            <Tooltip title={"Видалити зображення"}>
              <IconButton onClick={removeImageHandler(index)}
                          className={"rounded-lg bg-black/25 absolute top-2 right-2"}>
                <IoTrashBin/>
              </IconButton>
            </Tooltip>
          </Paper>
        ))}
        <label
          htmlFor={"file-upload"}
          className={"col-span-4 flex flex-col items-center justify-center gap-y-2 border-dashed border-2 border-neutral-400 rounded-lg"}
        >
          <span className={"text-neutral-500 font-light text-sm"}> Додати фото або фотки товару </span>
          <IconButton className={"rounded bg-black/5"}>
            <MdAdd/>
          </IconButton>
        </label>
        <Input
          slotProps={{input: {multiple: true}}}
          onChange={addImageHandler} id="file-upload"
          className={"invisible"}
          type={"file"}/>
      </div>
      <div className={"col-span-6 grid grid-cols-12 auto-rows-auto gap-4"}>
        <TextField value={formData.name}
                   onChange={(e) => setFormData(prevState => ({...prevState, name: e.target.value}))} required
                   className={"col-span-full"} label={"Назва"}/>
        <TextField value={formData.description}
                   onChange={(e) => setFormData(prevState => ({...prevState, description: e.target.value}))} required
                   className={"col-span-full"} multiline rows={8} label={"Опис"}/>
        <TextField value={formData.discount} defaultValue={0}
                   onChange={(e) => setFormData(prevState => ({...prevState, discount: Number(e.target.value)}))}
                   className={"col-span-4"} type={"number"} label={"Скидка"}/>
        <Autocomplete onChange={onSelectCategoryHandler} className={"col-span-4"}
                      renderInput={(params) => <TextField required {...params} label="Категорія"/>}
                      options={categoriesNames}/>

        <div className={"col-span-12 flex justify-end p-4"}>
          <Button type={"submit"} variant={"contained"} color={"success"}>
            Створити
          </Button>
        </div>
      </div>
    </form>
  )
}

export default CreateProductForm