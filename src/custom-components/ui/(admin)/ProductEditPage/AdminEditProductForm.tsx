'use client'

import React, {useState, useEffect} from "react";
import {
  Button,
  CircularProgress,
  TextField,
  Paper, Switch, FormControlLabel, Autocomplete,
} from "@mui/material";
import {useMutation, useQueries} from "@tanstack/react-query";
import {axiosWithAuth} from "@/services/axios/axios.interceptors";
import {ICategory, IProduct, ITag} from "@/interfaces";
import "../index.scss";
import {toast} from "react-toastify";
import * as zod from "zod";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import ControlledAutocomplete from "@/custom-components/ui/(shared)/ControlledAutocomplete";
import TagFetcher from "@/services/fetchers/TagFetcher";
import ProductFetcher from "@/services/fetchers/ProductFetcher";
import ManageTagsBox from "@/custom-components/ui/(admin)/ProductEditPage/ManageTagsBox";

interface AdminEditProductFormProps {
  productName: string;
}


const schema = zod.object({
  name: zod.string().min(1),
  discount: zod.number({coerce: true}).min(0),
  popular: zod.boolean(),
  description: zod.string().min(1),
  category_name: zod.string().min(1),
})

type FormDataSchema = zod.infer<typeof schema>

function AdminEditProductForm({productName}: AdminEditProductFormProps) {
  const {control, reset, handleSubmit, formState: {errors}} = useForm<FormDataSchema>({
    resolver: zodResolver(schema),
  })
  const [q_categories, q_product] = useQueries({
    queries: [
      {
        queryKey: ["categories"],
        queryFn: async () => {
          const response = await axiosWithAuth.get<{ items: ICategory[], count: number }>("/categories");
          return response.data;
        },
      },
      {
        queryKey: ["product", productName],
        queryFn: async () => {
          const response = await axiosWithAuth.get<IProduct>(`/products/${productName}`);
          return response.data;
        },
      }
    ],
  });

  const productMutate = useMutation({
    mutationFn: (foo: Function) => foo(),
    onSuccess: () => {
      toast.success("Продукт успішно оновлено.");
    },
    onError: (error: Error) => {
      toast.error(`Помилка: ${error.message}`);
    }
  });

  useEffect(() => {
    if (q_product.data) {
      reset(q_product.data)
    }
  }, [q_product.data]);


  const onSubmit: SubmitHandler<FormDataSchema> = (prodFormData) => {
    productMutate.mutate(() => ProductFetcher.update(productName, prodFormData as Required<FormDataSchema>))
  }


  if (q_categories.isLoading || q_product.isLoading) {
    return <CircularProgress/>;
  }

  if (q_categories.isError || q_product.isError) {
    return <div>Error loading data. Please try again later.</div>;
  }


  const categoriesNames = q_categories.data.items.map((item) => item.name);


  return (
    <Paper variant={"outlined"} className="w-full p-6">
      <form className="grid grid-cols-12 gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({field}) => (
            <TextField className="col-span-full" required label="Назва" {...field} />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({field}) => (
            <TextField className="col-span-full" multiline rows={5} required label="Опис" {...field} />
          )}
        />
        <Controller
          name="discount"
          control={control}
          render={({field}) => (
            <TextField className="col-span-4" type="number" label="Знижка" {...field} />
          )}
        />

        <ControlledAutocomplete
          name="category_name"
          control={control}
          options={categoriesNames}
          getOptionLabel={(option: string) => option}
          renderInput={(params) => <TextField {...params} label="Категорія"/>}
          renderOption={(props, option: string) => (
            <li {...props}>{option}</li>
          )}

          className={"col-span-4"}
        />
        <Controller
          name="popular"
          control={control}
          render={({field}) => (
            <FormControlLabel
              control={
                <Switch {...field} checked={field.value}/>
              }
              label="Популярний"
            />
          )}
        />

        <div className="col-span-8">
          <ManageTagsBox
            productName={productName}
          />
        </div>

        <div className="col-span-full flex items-center justify-end">
          <Button type="submit" variant="contained" color="primary">
            Зберегти зміни
          </Button>
        </div>
      </form>
    </Paper>
  );
}

export default AdminEditProductForm;