"use client"

import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import queryString from 'query-string';
import {CircularProgress, Pagination}
  from "@mui/material";
import React, {useContext, useState} from "react";
import TagFetcher from "@/services/fetchers/TagFetcher";
import {useSpecialQueries} from "@/hooks/useSpecialQueries";
import {AdminLayoutContext} from "@/context/AdminLayoutContext";
import {AxiosResponse} from "axios";
import {toast} from "react-toastify";
import {DataGrid, GridActionsCellItem, GridColDef} from "@mui/x-data-grid";
import {ICategory, IColor, ITag} from "@/interfaces";
import {IoTrashBin} from "react-icons/io5";
import clsx from "clsx";
import useQueryFilters from "@/hooks/useQueryFilters";
import TagsTableForm from "@/custom-components/ui/(admin)/TagsTablePage/TagsTableForm";
import {createPortal} from "react-dom";
import CustomSnackbar from "@/custom-components/ui/(shared)/CustomSnackbar/CustomSnackBar";
import useSnackBar from "@/hooks/useSnackBar";


export default function CategoryTable() {
  const {drawerState, match} = useContext(AdminLayoutContext)
  const {appendSearchQuery} = useQueryFilters()
  const {page} = useSpecialQueries()

  const [tagToDelete, setTagToDelete] = useState<string | null>(null)
  const {active, open, close} = useSnackBar()
  const onYesHandler = () => {
    tagsMutation.mutate(() => TagFetcher.deleteOneByName(tagToDelete))
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    appendSearchQuery({page: newPage})
  };

  const queryClient = useQueryClient()

  const tagsMutation = useMutation({
    mutationFn: (func: any) => func(),
    onSuccess: ({config}: AxiosResponse) => {
      queryClient.invalidateQueries({queryKey: ["tags"]})
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

  const {isError, error, isLoading, data} = useQuery({
    queryKey: ["tags", page],
    queryFn: async () => {
      return TagFetcher.getAllTags(queryString.stringify({page: page, limit: 10}));
    },
  });

  if (isLoading) return (
    <div className="mt-96 mx-auto">
      <CircularProgress/>
    </div>
  );
  if (isError) return <p>Error: {error.message}</p>;
  if (!data || !data.items) return <p>No data available</p>;


  const columns: GridColDef<ICategory>[] = [
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
      field: 'description',
      headerName: 'Опис',
      type: 'string',
      width: 120,
      editable: true,
      flex: 1,
      align: "right",
      headerAlign: "right",
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
            icon={(<IoTrashBin/>)}
            label="Видалити"
            color="inherit"
            onClick={() => {
              setTagToDelete(row.name)
              open()
            }}
          />,
        ]
      },
    }
  ];


  const processRowUpdate = (newRow: ITag, oldRow: ITag) => {
    if (JSON.stringify(newRow) === JSON.stringify(oldRow)) {
      return newRow
    }
    tagsMutation.mutate(() => TagFetcher.updateOneByName(newRow.name, newRow))
    return newRow
  }


  return (
    <div id="testmest" className="w-full flex min-[900px]:flex-row p-4 min-[900px]:gap-x-4 flex-col gap-y-4">
      <div className={clsx("flex flex-col flex-1 border-solid border-neutral-200 border-[1px] rounded p-4", {
        "w-[85%]": drawerState && !match,
        "w-[100%]": !drawerState && match
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
      <TagsTableForm/>

      <CustomSnackbar
        title={"Ви точно хочете видалити тег?"}
        active={active}
        onYes={onYesHandler}
        closeFn={close}
      />
    </div>
  )
}
