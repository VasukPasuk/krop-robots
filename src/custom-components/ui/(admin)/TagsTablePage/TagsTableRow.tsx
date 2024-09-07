import {
  IconButton,
  Input,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, TextField, Tooltip
} from "@mui/material";
import NoDataBlock from "@/custom-components/ui/(shared)/NoDataBlock";
import React from "react";
import {ITag} from "@/interfaces";
import {MdEdit, MdSave} from "react-icons/md";
import {IoMdTrash} from "react-icons/io";
import formatDate from "@/features/formatDate";
import * as zod from "zod";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosWithAuth} from "@/services/axios/axios.interceptors";
import {toast} from "react-toastify";
import TagFetcher from "@/services/fetchers/TagFetcher";

interface ITagsTablePageProps {
  data: ITag
}

const schema = zod.object({
  name: zod.string().min(1).trim(),
  description: zod.string().min(1).trim(),
})

type TagFormData = zod.infer<typeof schema>

export default function TagsTableRow({data}: ITagsTablePageProps) {
  const {control, handleSubmit, formState} = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: data.name,
      description: data.description,
    }
  })

  const client = useQueryClient();

  const tagMutation = useMutation({
    mutationFn: async (func: any) => {
      return func();
    },
    onSuccess: async () => {
      await client.invalidateQueries({queryKey: ["tags"]})
    },
    onError: () => toast.error("Сталася помилка!")
  })

  const onSubmit: SubmitHandler<TagFormData> = (formData) => {
    tagMutation.mutate(() => TagFetcher.updateOneByName(data.name, {name: formData.name, description: formData.description}))
  }

  const onDeleteHandler = () => {
    tagMutation.mutate(() => TagFetcher.deleteOneByName(data.name))
  }

  return (
    <TableRow
      sx={{'&:last-child td, &:last-child th': {border: 0}}}
    >
      <TableCell align="left">{data.id}</TableCell>
      <TableCell align="left">
        <Controller
          name="name"
          control={control}
          render={({field, fieldState: {error}}) => (
            <TextField
              {...field}
              error={!!error}
              helperText={error?.message}
              required
            />
          )}
        />
      </TableCell>
      <TableCell align="left">
        <Controller
          name="description"
          control={control}
          render={({field, fieldState: {error}}) => (
            <TextField
              {...field}
              error={!!error}
              helperText={error?.message}
              required
            />
          )}
        />
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

