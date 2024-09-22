"use client"
import {IconButton, Input, Paper, Tooltip} from "@mui/material";
import {IoTrashBin} from "react-icons/io5";
import {MdAdd} from "react-icons/md";
import React, {useContext} from "react";
import {CreateProductContext} from "@/context/CreateProductContext";

export default function CreateProductPage_ImagesForm() {
  const {productData, stateFn, setProductData} = useContext(CreateProductContext)

  const addImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as unknown as File[];
    if (files.length === 0) return;
    let filesToArray:File[] = [];
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') continue;
      if (productData.photos.some((e) => e.name === files[i].name)) continue;
      filesToArray.push(files[i]);
    }
    stateFn(prev => ({...prev, photos: [...prev.photos, ...filesToArray]}))
  }

  const removeImageHandler = (img_index: number) => () => {
    stateFn(prevState => ({...prevState, photos: prevState.photos.filter((_, index) => index !== img_index)}))
  }

  return (
    <div className={"grid grid-cols-12 gap-4 auto-rows-[250px] lg:w-1/2"}>
      {productData.photos.map((image: File, index) => (
        <Paper key={index}
               className={"added-image-slot xl:col-span-4 lg:col-span-6 md:col-span-4 s480:col-span-6 col-span-full bg-black/10 relative rounded-lg overflow-hidden"}>
          <img className="w-full h-full" alt={"product image"} src={URL.createObjectURL(image)}/>
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
        className={"xl:col-span-4 lg:col-span-6 md:col-span-4 s480:col-span-6 col-span-full flex flex-col items-center justify-center gap-y-2 border-dashed border-2 border-neutral-400 rounded-lg"}
      >
        <span className={"text-neutral-500 font-light text-[0.75rem] text-center"}> Додати фото або фотки товару </span>
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
  )
};