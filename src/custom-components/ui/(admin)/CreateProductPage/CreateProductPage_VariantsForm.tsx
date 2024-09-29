"use client"
import React, {useContext, useState} from "react";
import {CreateProductContext} from "@/context/CreateProductContext";
import clsx from "clsx";
import {Button, Tooltip} from "@mui/material";
import {MdAdd} from "react-icons/md";
import {IoMdTrash} from "react-icons/io";
import {DataGrid, GridActionsCellItem, GridColDef, GridRowModel} from "@mui/x-data-grid";
import {AdminLayoutContext} from "@/context/AdminLayoutContext";
import {IVariant} from "@/interfaces";
import {IoTrashBin} from "react-icons/io5";
import CreateProductPage_VariantsAddPopover from "@/custom-components/ui/(admin)/CreateProductPage/CreateProductPage_VariantsAddPopover";

export default function CreateProductPage_VariantsForm() {
  const {productData, stateFn, setProductData} = useContext(CreateProductContext)

  const {drawerState, match} = useContext(AdminLayoutContext)
  const [anchorRef, setAnchorRef] = useState<HTMLButtonElement | null>(null)

  const openPopover = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorRef(event.currentTarget)


  const processRowUpdate = (newRow: GridRowModel) => {
    const {id, created_at, updated_at, ...rest} = (newRow as IVariant);
    return newRow;
  };


  const columns: GridColDef<Omit<IVariant, "updated_at" | "created_at" | "id">>[] = [
    {
      field: 'id',
      headerName: 'ID',
      type: 'number',
      width: 120,
      editable: true,
      flex: 1,
    },
    {
      field: 'height',
      headerName: 'Висота',
      type: 'number',
      width: 120,
      editable: true,
      flex: 1,
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
      field: "actions",
      headerName: "Дії",
      type: "actions",
      cellClassName: "actions",
      getActions: ({row}) => {
        return [
          <GridActionsCellItem
            icon={<IoTrashBin />}
            label="Видалити"
            onClick={() => stateFn(prev => ({...prev, variants: prev.variants.filter(variant => variant.size_label !== row.size_label)}))}
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
              onClick={() => setProductData({variants: []})}
              variant="contained"
              color="error"
              className="normal-case"
              endIcon={<IoMdTrash/>}
            >
              Видалити
            </Button>
          </Tooltip>
          <CreateProductPage_VariantsAddPopover productName={productData.name} anchorRef={anchorRef} setAnchorRef={setAnchorRef}/>
        </div>
      </div>
      <div className="flex flex-col p-4">
        <DataGrid
          rows={productData.variants.map((value: {}, index) => ({id: ++index, ...value}))}
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
};