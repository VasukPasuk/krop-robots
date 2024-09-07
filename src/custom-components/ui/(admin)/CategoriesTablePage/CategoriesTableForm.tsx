import * as zod from "zod";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosWithAuth} from "@/services/axios/axios.interceptors";
import {Button, Paper, TextField} from "@mui/material";
import React from "react";

const CategoryCreateSchema = zod.object({
  name: zod.string().min(1).trim(),
  description: zod.string().min(1).trim()
})

type TypeCategoryCreateSchema = zod.infer<typeof CategoryCreateSchema>


export function CategoriesTableForm() {
  const {handleSubmit, control, reset} = useForm({
    resolver: zodResolver(CategoryCreateSchema)
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (data: TypeCategoryCreateSchema) => axiosWithAuth.post('/categories', data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["categories"]})
      reset({
        name: "",
        description: "",
      })
    },
  })


  const onSubmit: SubmitHandler<TypeCategoryCreateSchema> = (data) => {
    mutation.mutate(data as Required<TypeCategoryCreateSchema>)
  }

  return (
    <div className="ml-12 w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper variant={"outlined"} className={"p-4 flex flex-col gap-y-4"}>
          <Controller name={"name"} control={control} render={({field}) => (
            <TextField
              {...field}
              required
              label={"Назва"}
            />
          )}/>
          <Controller name={"description"} control={control} render={({field}) => (
            <TextField
              {...field}
              required
              multiline
              rows={12}
              label={"Опис"}
            />
          )}/>
          <Button className={"normal-case"} variant={"contained"} color={"success"} type={"submit"}>Створити</Button>
        </Paper>
      </form>
    </div>
  )
}