import * as zod from "zod";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosWithAuth} from "@/services/axios/axios.interceptors";
import {Button, Paper, TextField} from "@mui/material";
import React, {useEffect} from "react";
import {toast} from "react-toastify";
import minOneMessage from "@/features/minOneMessage";

const CategoryCreateSchema = zod.object({
  name: zod.string().trim().min(1, {
    message: minOneMessage("Назва")
  }),
  description: zod.string().trim().min(1, {
    message: minOneMessage("Опис")
  })
})

type TypeCategoryCreateSchema = zod.infer<typeof CategoryCreateSchema>


export function CategoriesTableForm() {
  const {handleSubmit, control, reset, formState: {errors}} = useForm({
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


  useEffect(() => {
    Object.values(errors).forEach(error => toast.error(error.message.toString()))
  }, [errors])

  return (
    <div className="lg:w-1/3 sm:w-1/2 w-full">
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