"use client"

import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import queryString from 'query-string';
import {useRouter} from "next/navigation";
import {
  Button, CircularProgress,
  Input,
  Pagination,
  Paper,
  TextField, Tooltip
} from "@mui/material";
import React, {useContext, useState} from "react";
import {IColor} from "@/interfaces";
import ColorFetcher from "@/services/fetchers/ColorFetcher";
import {toast} from "react-toastify";
import {DataGrid, GridActionsCellItem, GridColDef} from "@mui/x-data-grid";
import {IoTrashBin} from "react-icons/io5";
import clsx from "clsx";
import {AdminLayoutContext} from "@/context/AdminLayoutContext";
import {useSpecialQueries} from "@/hooks/useSpecialQueries";
import {AxiosResponse} from "axios";

export default function ColorsTable() {
  const {drawerState, match} = useContext(AdminLayoutContext)
  const {page} = useSpecialQueries()
  const router = useRouter();


  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    router.push(location.pathname + "?" + queryString.stringify({page: newPage}), {scroll: false}
    );
  };

  const queryClient = useQueryClient()

  const colorsMutation = useMutation({
    mutationFn: (func: any) => func(),
    onSuccess: ({config}:AxiosResponse) => {
      queryClient.invalidateQueries({queryKey: ["colors"]})
      const method = config.method;
      switch (method) {
        case "patch":
          toast.success("Дані оновлено.")
          break
        default:
          toast.success("Рядок успішно видалено!")
          break
      }
    },
    onError: () => toast.error("Сталася проблема")
  })

  const {isError, error, isFetched, isLoading, data} = useQuery({
    queryKey: ["colors", page],
    queryFn: async () => {
      return ColorFetcher.getAll("?" + queryString.stringify({page: page, limit: 10}));
    },
  });

  if (isLoading) return (
    <div className="mt-96 mx-auto">
      <CircularProgress/>
    </div>
  );
  if (isError) return <p>Error: {error.message}</p>;
  if (!data || !data.items) return <p>No data available</p>;


  const columns: GridColDef<IColor>[] = [
    {
      field: 'id',
      headerName: 'ID',
      type: 'number',
      width: 50,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: 'name',
      headerName: 'Назва',
      type: 'string',
      width: 120,
      editable: true,
      flex: 1,
      align: "right",
      headerAlign: "right",
    },
    {
      field: 'hex',
      headerName: 'Колір',
      type: 'custom',
      width: 120,
      editable: false,
      flex: 1,
      headerAlign: "right",
      renderCell: ({row}) => {
        return (
          <div className="w-full h-full flex items-center justify-end">
            <Paper className="w-8 h-8 rounded shadow" style={{background: row.hex}}/>
          </div>
        )
      }
    },
    {
      field: 'created_at',
      headerName: 'Дата оновлення',
      type: 'dateTime',
      width: 120,
      editable: false,
      flex: 1,
      align: "right",
      headerAlign: "right",
      valueGetter: (value) => {
        return new Date(value)
      },
    },
    {
      field: 'updated_at',
      headerName: 'Дата створення',
      type: "dateTime",
      sortable: true,
      width: 120,
      editable: false,
      flex: 1,
      align: "right",
      headerAlign: "right",
      valueGetter: (value) => {
        return new Date(value)
      },
    },
    {
      field: "actions",
      headerName: "Дії",
      type: "actions",
      cellClassName: "actions",
      getActions: ({row}) => {
        return [
          <GridActionsCellItem
            icon={<IoTrashBin/>}
            label="Видалити"
            onClick={() => colorsMutation.mutate(() => ColorFetcher.delete(row.name))}
            color="inherit"
          />,
        ]
      },
    }
  ];


  const processRowUpdate = (newRow: IColor, oldRow: IColor) => {
    if (JSON.stringify(newRow) === JSON.stringify(oldRow)) {
      return newRow
    }
    colorsMutation.mutate(() => ColorFetcher.update(newRow.id, newRow))
    return newRow
  }


  return (
    <div className="w-full flex min-[900px]:flex-row p-4 min-[900px]:gap-x-4 flex-col gap-y-4">
      <div className={clsx("flex flex-col flex-1 border-solid border-neutral-200 border-[1px] rounded p-4", {
        "w-[80%]": drawerState && !match,
        "w-full": !drawerState && match
      })}>
        <DataGrid
          rows={data.items}
          columns={columns}
          disableRowSelectionOnClick
          processRowUpdate={processRowUpdate}
          hideFooterPagination
        />
        <div className="flex items-center justify-center p-2">
          <Pagination
            count={Math.ceil(data.count / 10)}
            page={page}
            onChange={handlePageChange}
            size="large"
            shape="rounded"
            siblingCount={1}
            boundaryCount={1}
          />
        </div>
      </div>
      <CreateColorForm/>
    </div>

  )
}


function CreateColorForm() {
  const queryClient = useQueryClient()
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
    <form
      className="lg:w-1/3 sm:w-1/2 w-full"
      onSubmit={onSubmit}
    >
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
  )
}