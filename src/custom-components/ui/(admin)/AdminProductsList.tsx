"use client"

import {Button, CircularProgress, IconButton, Paper, Tooltip} from "@mui/material";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {usePagination} from "@/hooks/usePagination";
import Image from "next/image";
import {IProduct} from "@/interfaces";
import {axiosWithAuth} from "@/services/axios/axios.interceptors";
import {IoTrashBin} from "react-icons/io5";
import {AiFillEye, AiOutlinePicture} from "react-icons/ai";
import {toast} from "react-toastify";
import {IoMdTrash} from "react-icons/io";
import {MdEdit, MdSignalCellularNodata} from "react-icons/md";
import {useRouter} from "next/navigation";
import {ADMIN_URLS} from "@/constants/enums";
import { BsClipboardData } from "react-icons/bs";
import NoDataBlock from "@/custom-components/ui/(shared)/NoDataBlock";


export default function AdminProductsList() {
  const {limit, order_rule, page} = usePagination()
  const {data, isError, isLoading, isFetched} = useQuery({
    queryKey: ["products", limit, order_rule, page],
    queryFn: async () => {
      try {
        return (await axiosWithAuth.get<{ items: IProduct[], count: number }>("/products/admin/list")).data
      } catch (e) {
        throw new Error(`Error fetching product: ${e.message}`);
      }
    }
  })

  if (isLoading) return (
    <div className="mt-96 mx-auto">
      <CircularProgress />
    </div>
  );
  if (isError) return <p>Error</p>;
  if (!data && isFetched) return <p>No data available</p>;


  if (data.items.length === 0) return <NoDataBlock children={"Продуктів в наявності немає"}/>


  return (
    <div className={"w-full grid grid-cols-12 auto-rows-min gap-16 md:px-16 md:py-8"}>
      {data.items.map((product) => (
        <AdminProductsListCard key={product.name} data={product}/>
      ))}
    </div>
  )
}

interface IAdminProductsListCardProps {
  data: IProduct
}

function AdminProductsListCard({data}: IAdminProductsListCardProps) {
  const router = useRouter()
  const source = !!data.photos[0]?.source && process.env.NEXT_PUBLIC_API_URL + "/" + data.photos[0]?.source
  const queryClient = useQueryClient()
  const deleteProductMutation = useMutation({
    mutationFn: async () => {
      try {
        return axiosWithAuth.delete(`/products/${data.name}`);
      } catch (e) {
        throw new Error(`Error fetching product`);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["products"]})
      toast.success("Продукт успішно видалено")
    },
    onError: () => {
      toast.error("Упс. Щось сталося не так!")
    },
  })

  const editHandler = () => router.push(`${ADMIN_URLS.BASE_ADMIN_URL}/products/edit/${data.name}`)
  const deleteHandler = () => deleteProductMutation.mutate()


  return (
    <Paper className="col-span-3 flex flex-col overflow-hidden">
      <div className={"w-full h-64 relative overflow-hidden"}>
        {!!source && <Image fill src={source} alt={"Фото продукту"} className="hover:scale-105 transition duration-700 transform"/>}
        {!source && (
          <div className={"w-full h-full flex flex-col gap-y-2 items-center justify-center select-none text-neutral-500 font-light"}>
            <AiOutlinePicture className={"text-9xl"}/>
            Продукт не має головної картинки

          </div>
        )}
      </div>
      <div className="flex flex-col p-4">
        {/*<div className="text-xl">№{data.id}</div>*/}
        <div className="text-2xl line-clamp-1">{data.name}</div>
        <div className="text-base text-neutral-500">{data.category_name}</div>
      </div>
      <div className="flex flex-row items-center justify-end mt-auto p-4">
        <Tooltip title={"Редагувати"}>
          <IconButton onClick={editHandler}  className="">
            <MdEdit/>
          </IconButton>
        </Tooltip>
        <Tooltip title={"Видалити"}>
          <IconButton color={"error"} className="" onClick={deleteHandler}>
            <IoMdTrash/>
          </IconButton>
        </Tooltip>
      </div>
    </Paper>
  )
}