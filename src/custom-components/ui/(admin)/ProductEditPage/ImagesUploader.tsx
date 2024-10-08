"use client";

import React from "react";
import {IconButton, Input, Paper, Tooltip, CircularProgress} from "@mui/material";
import {IoTrashBin} from "react-icons/io5";
import {MdAdd} from "react-icons/md";
import {IPhoto} from "@/interfaces";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {axiosWithAuth} from "@/services/axios/axios.interceptors";
import PhotoFetcher from "@/services/fetchers/PhotoFetcher";

interface ImagesUploaderProps {
  productName: string;
}

export function ImagesUploader({productName}: ImagesUploaderProps) {
  const queryClient = useQueryClient();

  const {data: photosData, isLoading, isError} = useQuery({
    queryKey: ['images', productName],
    queryFn: async () => {
      const response = await axiosWithAuth.get<{ items: IPhoto[], count: number }>(`/photos/products/${productName}`);
      return response.data;
    }
  });

  const photoMutation = useMutation({
    mutationFn: (foo: Function) => foo(),
    onError: () => toast.error("Сталася помилка"),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["images", productName]});
    },
  });


  const addImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => photoMutation.mutate(() => PhotoFetcher.createOne(file, productName)));
    }
  };

  const removeImageHandler = (photoId: number) => () => photoMutation.mutate(() => PhotoFetcher.deleteOneById(photoId));

  if (isLoading) return <CircularProgress/>;
  if (isError) return <div>Error loading images</div>;

  const photos = photosData?.items || [];

  return (
    <div className="col-span-6 grid grid-cols-12 gap-4 auto-rows-[250px] w-full p-2">
      {photos.map((photo: IPhoto) => (
        <Paper key={photo.id} className="added-image-slot xl:col-span-4 lg:col-span-6 md:col-span-4 s480:col-span-6 col-span-full bg-black/10 relative rounded-lg overflow-hidden">
          <img className="w-full h-full" alt="product image" src={`${process.env.NEXT_PUBLIC_API_URL}/static/${photo.source}`}/>
          <Tooltip title="Видалити зображення">
            <IconButton
              onClick={removeImageHandler(photo.id)}
              className="rounded-lg bg-black/25 absolute top-2 right-2"
            >
              <IoTrashBin/>
            </IconButton>
          </Tooltip>
        </Paper>
      ))}
      <label
        htmlFor="file-upload"
        className="col-span-full flex flex-col items-center justify-center gap-y-2 border-dashed border-2 border-neutral-400 rounded-lg cursor-pointer"
      >
        <span className="text-neutral-500 font-light text-[0.75rem] text-center">Додати фото або фотки товару</span>
      </label>
      <Input
        id="file-upload"
        type="file"
        inputProps={{multiple: true}}
        onChange={addImageHandler}
        className="hidden"
      />
    </div>
  );
}