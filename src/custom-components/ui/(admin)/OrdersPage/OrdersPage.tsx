"use client"

import {DataGrid, GridActionsCellItem, GridColDef, GridRowModel} from "@mui/x-data-grid";
import React, {useState} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {OrderService} from "@/services/order.service";
import {useSpecialQueries} from "@/hooks/useSpecialQueries";
import {IOrder, IVariant} from "@/interfaces";
import {IoEye, IoTrashBin} from "react-icons/io5";
import {Button, Chip, IconButton, Pagination, Snackbar, Tooltip} from "@mui/material";
import CustomSnackbar from "@/custom-components/ui/(shared)/CustomSnackbar/CustomSnackBar";
import useSnackBar from "@/hooks/useSnackBar";
import useQueryFilters from "@/hooks/useQueryFilters";

const STATUS_DICT = {
  "PROCESSING": "В процесі",
  "FULFILLED": "Виконано",
}


const emptyFormatter = (str: string) => Boolean(str) ? str : "NULL"

function OrdersPage() {
  const {appendSearchQuery} = useQueryFilters()
  const {active, close, open} = useSnackBar()
  const {page} = useSpecialQueries()
  const client = useQueryClient()






  const orderMutation = useMutation({
    mutationFn: (foo: Function) => foo(),
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: ["orders"]
      })
    },
    onError: () => {
      toast.error("Щось не так!")
    }
  })

  const ordersQuery = useQuery({
    queryKey: ["orders", page],
    queryFn: () => OrderService.getMany(),
    select: (data) => data.data
  })


  if (ordersQuery.isLoading) {
    return (
      <> Loading... </>
    )
  }

  if (ordersQuery.isError || !ordersQuery.data) {
    return (
      <> Error! </>
    )
  }



  const deleteOrder = () => {

  }


  const columns: GridColDef<IOrder>[] = [
    {
      field: 'id',
      headerName: 'ID',
      type: 'number',
      width: 75,
    },
    {
      field: 'surname',
      headerName: 'Прізвище',
      type: 'string',
      align: "right",
      headerAlign: "right",
      width: 200,
    },
    {
      field: 'name',
      headerName: "Ім'я",
      type: 'string',
      align: "right",
      headerAlign: "right",
      width: 200,
    },
    {
      field: 'total_items',
      headerName: 'Кількість товарів',
      type: "number",
      width: 150,
      align: "right",
      headerAlign: "right",
    },
    {
      field: 'total_price',
      headerName: 'Загальна ціна',
      type: 'number',
      width: 150,
      align: "right",
      headerAlign: "right",
    },
    {
      field: 'status',
      headerName: 'Статус',
      type: "string",
      align: "right",
      headerAlign: "right",
      sortable: true,
      width: 150,
      valueGetter: (value) => STATUS_DICT[value],
      renderCell: ({row}) => (
        <Chip label={STATUS_DICT[row.status]} color={row.status === "FULFILLED" ? "success" : "warning"}/>
      )
    },
    {
      field: 'delivery_type',
      align: "right",
      headerAlign: "right",
      headerName: 'Доставка',
      type: 'string',
      width: 200,
    },
    {
      field: 'payment_type',
      align: "right",
      headerAlign: "right",
      headerName: 'Платіж',
      type: 'string',
      width: 200,
    },
    {
      field: 'department_address',
      align: "right",
      headerAlign: "right",
      headerName: 'Адреса відділу',
      type: 'string',
      width: 200,
      valueGetter: (value) => emptyFormatter(value)
    },
    {
      field: 'email',
      headerName: 'Ел. пошта',
      type: "string",
      sortable: true,
      width: 200,
      align: "right",
      headerAlign: "right",
    },
    {
      field: 'phone',
      headerName: 'Телефон',
      type: "string",
      sortable: true,
      width: 200,
      align: "right",
      headerAlign: "right",
    },
    {
      field: 'region',
      headerName: 'Область',
      type: "string",
      sortable: true,
      width: 200,
      align: "right",
      headerAlign: "right",
    },
    {
      field: 'locality',
      headerName: 'Населений пункт',
      type: "string",
      sortable: true,
      width: 200,
      align: "right",
      headerAlign: "right",
    },
    {
      field: 'house',
      headerName: 'Будинок',
      type: "string",
      sortable: true,
      width: 200,
      align: "right",
      headerAlign: "right",
      valueGetter: (value) => emptyFormatter(value)
    },
    {
      field: 'street',
      headerName: 'Вулиця',
      type: "string",
      sortable: true,
      width: 200,
      align: "right",
      headerAlign: "right",
      valueGetter: (value) => emptyFormatter(value)
    },
    {
      field: 'floor',
      headerName: 'Поверх',
      type: "string",
      sortable: true,
      width: 200,
      align: "right",
      headerAlign: "right",
      valueGetter: (value) => emptyFormatter(value)
    },
    {
      field: 'appartment',
      headerName: 'Квартира',
      type: "string",
      sortable: true,
      width: 200,
      align: "right",
      headerAlign: "right",
      valueGetter: (value) => emptyFormatter(value)
    },
    {
      field: 'EDRPOY_CODE',
      headerName: 'Код ЄРДПОУ',
      type: "string",
      sortable: true,
      width: 200,
      align: "right",
      headerAlign: "right",
      valueGetter: (value) => emptyFormatter(value)
    },
    {
      field: 'legal_entity',
      headerName: 'Повна назва юр. особи',
      type: "string",
      sortable: true,
      width: 200,
      align: "right",
      headerAlign: "right",
      valueGetter: (value) => emptyFormatter(value)
    },
    {
      field: 'created_at',
      headerName: 'Дата створення',
      type: "dateTime",
      sortable: true,
      width: 200,
      align: "right",
      headerAlign: "right",
      valueGetter: (value) => {
        return new Date(value)
      }
    },
    {
      field: 'updated_at',
      headerName: 'Дата створення',
      type: "dateTime",
      sortable: true,
      width: 200,
      align: "right",
      headerAlign: "right",
      valueGetter: (value) => {
        return new Date(value)
      }
    },
    {
      field: "actions",
      headerName: "Дії",
      type: "actions",
      cellClassName: "actions",
      width: 200,
      getActions: ({row}) => {
        return [
          <GridActionsCellItem
            icon={<IoEye size={24}/>}
            label="Змінити статус на 'В процесі'"
            color="secondary"
            title="Побачити всю інформацію"
            onClick={undefined}
          />,
          <GridActionsCellItem
            icon={<IoTrashBin size={24}/>}
            label="Видалити"
            onClick={open}
            color="error"
          />,
          <GridActionsCellItem
            label="Змінити статус на 'Виконаний'"
            color="inherit"
            onClick={() => orderMutation.mutate(() => OrderService.changeOrderStatus(row.id, "FULFILLED"))}
            showInMenu
          />,
          <GridActionsCellItem
            label="Змінити статус на 'В процесі'"
            color="inherit"
            onClick={() => orderMutation.mutate(() => OrderService.changeOrderStatus(row.id, "PROCESSING"))}
            showInMenu
          />
        ]
      },
    }
  ];

  return (
    <div className="p-6 flex flex-col gap-y-4">
      <div>
        <DataGrid
          rows={ordersQuery.data.items}
          columns={columns}
          hideFooterPagination
          checkboxSelection={false}
          disableRowSelectionOnClick
          className="w-full max-w-[84dvw]"
        />
      </div>
      <div className="flex justify-center items-center">
        <Pagination
          count={Math.ceil(ordersQuery.data.count / 10)}
          page={page}
          onChange={(_, new_page) => appendSearchQuery({page: new_page})}
          size="large"
          shape="rounded"
          siblingCount={1}
          boundaryCount={1}
        />
      </div>
      <CustomSnackbar
        title={"Ви точно хочете видалити замовлення?"}
        active={active}
        onYes={deleteOrder}
        closeFn={close}
      />
    </div>

  )
}


export default OrdersPage