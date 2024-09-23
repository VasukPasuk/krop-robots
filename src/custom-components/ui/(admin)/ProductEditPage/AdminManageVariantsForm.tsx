import {IVariant} from "@/interfaces";
import React, {useContext, useState} from "react";
import {
  Button,
  Tooltip
} from "@mui/material";
import {MdAdd} from "react-icons/md";
import {IoMdTrash} from "react-icons/io";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import AdminCreateVariantPopover from "@/custom-components/ui/(shared)/AdminCreateVariantPopover";
import {toast} from "react-toastify";
import {DataGrid, GridActionsCellItem, GridColDef, GridRowModel} from "@mui/x-data-grid";
import {VariantService} from "@/services/variant.service";
import {AxiosError} from "axios";
import {IoTrashBin} from "react-icons/io5";
import clsx from "clsx";
import {AdminLayoutContext} from "@/context/AdminLayoutContext";







function AdminManageVariantsForm({productName}: { productName: string }) {
  const {drawerState, match} = useContext(AdminLayoutContext)
  const [anchorRef, setAnchorRef] = useState<HTMLButtonElement | null>(null)

  const client = useQueryClient()

  const variantsMutation = useMutation({
    mutationFn: (foo: Function) => foo(),
    onSuccess: async ({}) => {
      await client.invalidateQueries({queryKey: ["variants", productName]})
    },
    onError: (error: AxiosError) => {
      toast.error(error.message)
    }
  })


  const q_variants = useQuery({
    queryKey: ["variants", productName],
    queryFn: async () => await VariantService.getManyOfProduct(productName),
    select: (data) => {
      return data.data
    }
  })

  const openPopover = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorRef(event.currentTarget)

  if (q_variants.isLoading) return <p>Loading...</p>;
  if (q_variants.error) return <p>Error: {q_variants.error.message}</p>;

  const variants = q_variants.data.items

  const processRowUpdate = (newRow: GridRowModel) => {
    const {id, created_at, updated_at, ...rest} = (newRow as IVariant);
    variantsMutation.mutate(() => VariantService.update(id, rest))
    return newRow;
  };


  const columns: GridColDef<IVariant>[] = [
    {
      field: 'id',
      type: "number",
      headerName: 'ID',
      width: 120,
      flex: 1
    },
    {
      field: 'height',
      headerName: 'Висота',
      type: 'number',
      width: 120,
      editable: true,
      flex: 1
    },
    {
      field: 'width',
      headerName: 'Ширина',
      type: 'number',
      width: 120,
      editable: true,
      flex: 1
    },
    {
      field: 'length',
      headerName: 'Довжина',
      type: 'number',
      width: 120,
      editable: true,
      flex: 1
    },
    {
      field: 'weight',
      headerName: 'Вага',
      type: "number",
      sortable: true,
      width: 120,
      editable: true,
      flex: 1
    },
    {
      field: 'size_label',
      headerName: 'Назва',
      type: "string",
      align: "right",
      sortable: true,
      width: 150,
      editable: true,
      flex: 1
    },
    {
      field: 'created_at',
      headerName: 'Дата створення',
      type: "dateTime",
      align: "right",
      sortable: true,
      width: 200,
      editable: false,
      valueGetter: (value) => {
        return new Date(value)
      },
      flex: 1
    },
    {
      field: 'updated_at',
      headerName: 'Дата оновлення',
      type: "dateTime",
      align: "right",
      sortable: true,
      width: 200,
      editable: false,
      valueGetter: (value) => {
        return new Date(value)
      },
      flex: 1
    },
    {
      field: "actions",
      headerName: "Дії",
      type: "actions",
      cellClassName: "actions",
      getActions: ({row}) => {
        return [
          <GridActionsCellItem
            icon={<IoTrashBin />}
            label="Видалити"
            onClick={() => variantsMutation.mutate(() => VariantService.delete(row.id))}
            color="inherit"
          />,
        ]
      },
    }
  ];



  return (
    <div className={clsx("flex flex-col flex-1 border-solid border-neutral-200 border-[1px] rounded", {
      "w-[85%]": drawerState && !match,
      "w-full": !drawerState && match
    })}>
      <div className="flex justify-between items-center py-4 px-8">
        <div className="text-2xl text-neutral-600">
          Варіанти
        </div>
        <div className="flex gap-x-4">
          <Tooltip title={"Додади запис про варіант продукту"}>
            <Button
              onClick={openPopover}
              variant="contained"
              color="primary"
              className="normal-case"
              endIcon={<MdAdd/>}>
              Додади
            </Button>
          </Tooltip>
          <Tooltip title={"Видалити усі варіанти продукту"}>
            <Button
              onClick={() => variantsMutation.mutate(() => VariantService.deleteManyOfProduct(productName))}
              variant="contained"
              color="error"
              className="normal-case"
              endIcon={<IoMdTrash/>}
            >
              Видалити
            </Button>
          </Tooltip>
          <AdminCreateVariantPopover productName={productName} anchorRef={anchorRef} setAnchorRef={setAnchorRef}/>
        </div>
      </div>
      <div className="flex flex-col p-4">
        <DataGrid
          rows={variants}
          columns={columns}
          hideFooterPagination
          checkboxSelection
          disableRowSelectionOnClick
          processRowUpdate={processRowUpdate}
          className="w-full max-w-full"
        />
      </div>
    </div>
  )
}

export default AdminManageVariantsForm




