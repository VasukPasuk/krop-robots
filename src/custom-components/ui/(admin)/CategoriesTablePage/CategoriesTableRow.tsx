import {ICategory} from "@/interfaces";
import React, {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosWithAuth} from "@/services/axios/axios.interceptors";
import {IconButton, Input, TableCell, TableRow, Tooltip} from "@mui/material";
import {MdEdit, MdSave} from "react-icons/md";
import {IoMdTrash} from "react-icons/io";
import formatDate from "@/features/formatDate";
import * as zod from "zod";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "react-toastify";
import CategoryFetcher from "@/services/fetchers/CategoryFetcher";


const CategoryUpdateSchema = zod.object({
  name: zod.string().min(1).trim(),
  description: zod.string().min(1).trim()
})

type TypeCategoryUpdateSchema = zod.infer<typeof CategoryUpdateSchema>

export function CategoryTableRow({data}: { data: ICategory }) {
  const {handleSubmit, control} = useForm({
    resolver: zodResolver(CategoryUpdateSchema),
    defaultValues: {
      name: data.name,
      description: data.description,
    }
  })
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (foo:Function) => foo(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["categories"]})
    },
    onError: () => toast.error("Щось сталося не так")
  })

  const onDeleteHandler = () => {
    mutation.mutate(() => CategoryFetcher.delete(data.name))
  }

  const onSubmit: SubmitHandler<TypeCategoryUpdateSchema> = (formData) => {
    mutation.mutate(() => CategoryFetcher.update(data.name, formData))
  }

  return (
    <TableRow
      sx={{'&:last-child td, &:last-child th': {border: 0}}}
    >
      <TableCell align="left">{data.id}</TableCell>
      <TableCell align="left">
        <Controller name={"name"} render={({field}) => (
          <Input {...field}/>
        )} control={control}/>
      </TableCell>
      <TableCell align="left">
        <Controller name={"description"} render={({field}) => (
          <Input {...field}/>
        )} control={control}/>
      </TableCell>
      <TableCell align="left">{formatDate(data.created_at)}</TableCell>
      <TableCell align="left">{formatDate(data.updated_at)}</TableCell>
      <TableCell align="center">
        <form onSubmit={handleSubmit(onSubmit)} className={"flex gap-x-2"}>
          <Tooltip title={"Зберегти"}>
            <IconButton type="submit">
              <MdSave/>
            </IconButton>
          </Tooltip>
          <Tooltip title={"Видалити"}>
            <IconButton onClick={onDeleteHandler}>
              <IoMdTrash/>
            </IconButton>
          </Tooltip>
        </form>
      </TableCell>
    </TableRow>
  )
}