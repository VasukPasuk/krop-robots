"use client"

import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import queryString from 'query-string';
import {useRouter, useSearchParams} from "next/navigation";
import {axiosWithAuth} from "@/services/axios/axios.interceptors";
import {
  Button, CircularProgress,
  IconButton, Input,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, TextField, Tooltip
} from "@mui/material";
import {IoMdTrash} from "react-icons/io";
import React, {useState} from "react";
import {IColor} from "@/interfaces";
import formatDate from "@/features/formatDate";
import ColorFetcher from "@/services/fetchers/ColorFetcher";
import {toast} from "react-toastify";
import * as zod from "zod";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {MdSave} from "react-icons/md";

export default function ColorsTable() {
  const searchParams = useSearchParams();
  const searchParamsObj = {
    page: searchParams.get("page") || 1,
  }

  const router = useRouter();

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    router.push(location.pathname + "?" + queryString.stringify({page: newPage}), {scroll: false}
    );
  };


  const {isError, error, isFetched, isLoading, data} = useQuery({
    queryKey: ["colors", searchParamsObj.page],
    queryFn: async () => {
      return ColorFetcher.getAll("?" + queryString.stringify({page: searchParamsObj.page}));
    },
  });

  if (isLoading) return (
    <div className="mt-96 mx-auto">
      <CircularProgress/>
    </div>
  );
  if (isError) return <p>Error: {error.message}</p>;
  if (!data || !data.items) return <p>No data available</p>;

  return (
    <>
      <div className={"flex flex-col gap-y-4 items-center"}>
        <TableContainer sx={{width: 1300}} component={Paper}>
          <Table sx={{minWidth: 1300}}>
            <TableHead>
              <TableRow>
                <TableCell align="left">Номер</TableCell>
                <TableCell align="left">Колір</TableCell>
                <TableCell align="left">Назва</TableCell>
                <TableCell align="left">Hex</TableCell>
                <TableCell align="left">Дата створення</TableCell>
                <TableCell align="left">Дата оновлення</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.items.map((color) => (
                <ColorTableRow key={color.name} data={color}/>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={Math.ceil(data.count / 10)}
          page={Number(searchParams.get("page")) || 1}
          onChange={handlePageChange}
          size="large"
          shape="rounded"
          siblingCount={1}
          boundaryCount={1}
        />
      </div>
      <CreateColorForm/>
    </>
  )
}


const EditColorSchema = zod.object({
  name: zod.string().min(1).trim(),
  hex: zod.string().min(1).trim(),
})
type TypeEditColorSchema = zod.infer<typeof EditColorSchema>

function ColorTableRow({data}: { data: IColor }) {
  const {control, handleSubmit} = useForm({
    resolver: zodResolver(EditColorSchema),
    defaultValues: {
      name: data.name,
      hex: data.hex,
    }
  })

  const onSubmit:SubmitHandler<TypeEditColorSchema> = (colorFormData) => {
    colorsMutation.mutate(() => ColorFetcher.update(data.id, {name: colorFormData.name, hex: colorFormData.hex}), {})
  }

  const queryClient = useQueryClient()

  const colorsMutation = useMutation({
    mutationFn: (func:any) => func(),
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["colors"]}),
    onError: () => toast.error("Сталася проблема")
  })

  const onDeleteHandler = () => {
    colorsMutation.mutate(() => ColorFetcher.delete(data.name))
  }


  return (
    <TableRow
      sx={{'&:last-child td, &:last-child th': {border: 0}}}
    >
      <TableCell align="left">{data.id}</TableCell>
      <TableCell align="left">
        <Paper className="w-8 h-8 rounded" style={{background: data.hex}}/>
      </TableCell>
      <TableCell align="left">
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              error={!!error}
            />
          )}
        />
      </TableCell>
      <TableCell align="left">
        <Controller
          name="hex"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>

              <Tooltip title={"Змінити колір"}>
                <Button variant="outlined">
                  <label className="w-full h-full" htmlFor={field.name + data.id}>
                    {data.hex}
                  </label>
                </Button>
              </Tooltip>

              <Input
                className={"invisible"}
                id={field.name + data.id}
                {...field}
                error={!!error}
                type={"color"}
              />
            </>
          )}
        />
      </TableCell>
      <TableCell align="left"> {formatDate(data.created_at)} </TableCell>
      <TableCell align="left"> {formatDate(data.updated_at)} </TableCell>
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

function CreateColorForm() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const [hex, setHex] = useState<string>("")
  const [name, setName] = useState<string>("")


  const hexFieldHandler = (e) => {
    setHex(prev => e.target.value)
  }
  const nameFieldHandler = (e) => {
    setName(prev => e.target.value)
  }

  const mutation = useMutation({
    mutationFn: (foo: any) => foo(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["colors"]})
      setHex("")
      setName("")
    },
    onError: () => toast.error("Сталася помилка")
  })

  const onSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(() => ColorFetcher.create({hex, name}))
  }

  return (
    <div className="ml-12">
      <form onSubmit={onSubmit}>
        <Paper variant={"outlined"} className={"p-4 flex flex-col gap-y-4"}>
          <TextField label={"Назва"} value={name} type={"text"} onChange={nameFieldHandler}/>
          <div className="flex gap-x-4 items-center justify-between">
            <Tooltip title={"Обрати колір з кольорової палітри"}>
              <Button variant="outlined" color="secondary">
                <label htmlFor="choose-color-create" className="w-full h-full"> Обрати колір </label>
              </Button>
            </Tooltip>
            <Input className="invisible w-0 h-0" type="color" id="choose-color-create" value={hex}
                   onChange={hexFieldHandler}/>
            <Paper className="w-8 h-8 rounded" style={{background: hex}}>

            </Paper>
          </div>
          <Button className={"normal-case"} variant={"contained"} color={"success"} type={"submit"}>Створити</Button>
        </Paper>
      </form>
    </div>
  )
}