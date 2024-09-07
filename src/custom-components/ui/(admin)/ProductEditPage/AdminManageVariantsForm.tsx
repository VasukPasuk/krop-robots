import {IVariant} from "@/interfaces";
import React, {useState} from "react";
import {
  Button,
  ButtonGroup,
  IconButton,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip
} from "@mui/material";
import {MdAdd, MdEdit, MdSave} from "react-icons/md";
import {IoMdTrash} from "react-icons/io";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {axiosWithAuth} from "@/services/axios/axios.interceptors";
import AdminManageVariantBar from "@/custom-components/ui/(admin)/ProductEditPage/AdminManageVariantBar";
import AdminCreateVariantPopover from "@/custom-components/ui/(shared)/AdminCreateVariantPopover";
import {toast} from "react-toastify";

const HeadTitles = [
  {name: "ID"}, {name: "Висота"},
  {name: "Ширина"}, {name: "Довжина"},
  {name: "Вага"}, {name: "Ціна"},
  {name: "Продукт"},
  {name: "Назва"}, {name: "Дата створення"},
  {name: "Дата оновлення"}, {name: ""},
]

function AdminManageVariantsForm({productName}: { productName: string }) {
  const [anchorRef, setAnchorRef] = useState<HTMLButtonElement | null>(null)

  const client = useQueryClient()

  const mutate = useMutation({
    mutationFn: () => {
      return axiosWithAuth.delete(`/variants/products/${productName}`)
    },
    onSuccess: async () => {
      toast.success(`Всі варіанти продукту ${productName} успішно видалено!`)
      await client.invalidateQueries({queryKey: ["variants", productName]})
    },
    onError: () => {
      toast.error("Сталася помилка.")
    }
  })


  const q_variants = useQuery({
    queryKey: ["variants", productName],
    queryFn: async () => {
      try {
        return (await axiosWithAuth.get<{
          items: Array<IVariant>,
          count: number
        }>(`/variants/products/${productName}`)).data
      } catch (e) {
        throw new Error
      }
    },
  })

  const openPopover = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorRef(event.currentTarget)

  if (q_variants.isLoading) return <p>Loading...</p>;
  if (q_variants.error) return <p>Error: {q_variants.error.message}</p>;

  const variants = q_variants.data.items

  return (
    <div className="border-solid border-neutral-200 border-[1px] rounded overflow-hidden">
      <div className="flex justify-between items-center py-4 px-8">
        <div className="text-2xl text-neutral-600">
          Варіанти
        </div>
        <div className="flex gap-x-4">
          <Tooltip title={"Додади запис про варіант продукту"}>
            <Button onClick={openPopover} variant="contained" color="primary" className="normal-case" endIcon={<MdAdd/>}>
              Додади
            </Button>
          </Tooltip>

          <Tooltip title={"Видалити усі варіанти продукту"}>
            <Button onClick={() => mutate.mutate()} variant="contained" color="error" className="normal-case" endIcon={<IoMdTrash/>}>
              Видалити
            </Button>
          </Tooltip>

          <AdminCreateVariantPopover productName={productName} anchorRef={anchorRef} setAnchorRef={setAnchorRef}/>
        </div>
      </div>
      <TableContainer sx={{width: 1600}} component="div">
        <Table sx={{width: 1650}}>
          <TableHead className="bg-neutral-100">
            <TableRow>
              {HeadTitles
                .map((data) => (
                  <TableCell className="font-[500] text-neutral-500" align="left">
                    {data.name}
                  </TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {variants
              .map((variant, index) => (
                <AdminManageVariantBar key={index} data={variant}/>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default AdminManageVariantsForm




