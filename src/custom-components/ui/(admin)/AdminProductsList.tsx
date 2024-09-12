"use client"

import {Button, CircularProgress, Divider, IconButton, Menu, MenuItem, Paper, Tooltip} from "@mui/material";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {usePagination} from "@/hooks/usePagination";
import Image from "next/image";
import {IProduct} from "@/interfaces";
import {axiosWithAuth} from "@/services/axios/axios.interceptors";
import {AiFillEye, AiOutlinePicture} from "react-icons/ai";
import {toast} from "react-toastify";
import {IoMdTrash} from "react-icons/io";
import {MdEdit, MdSignalCellularNodata} from "react-icons/md";
import {useRouter} from "next/navigation";
import {ADMIN_URLS} from "@/constants/enums";
import NoDataBlock from "@/custom-components/ui/(shared)/NoDataBlock";
import ProductFetcher from "@/services/fetchers/ProductFetcher";
import queryString from "query-string";
import React from "react";
import {FaEllipsisVertical} from "react-icons/fa6";


export default function AdminProductsList() {
  const {limit, order_rule, page} = usePagination()
  const {data, isError, isLoading, isFetched} = useQuery({
    queryKey: ["products", limit, order_rule, page],
    queryFn: async () => ProductFetcher.getCatalog(queryString.stringify({limit: "30"}))
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
    <div className={"w-full grid grid-cols-5 auto-rows-min gap-8 md:px-16 md:py-8"}>
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


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const queryClient = useQueryClient()
  const productMutation = useMutation({
    mutationFn: (foo: Function) => foo(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["products"]})
      toast.success("Продукт успішно видалено")
    },
    onError: () => {
      toast.error("Упс. Щось сталося не так!")
    },
  })

  const editHandler = () => router.push(`${ADMIN_URLS.BASE_ADMIN_URL}/products/edit/${data.name}`)
  const deleteHandler = () => productMutation.mutate(() => ProductFetcher.deleteOne(data.name))
  const productStatusHandler = (status: boolean) => () => productMutation.mutate(() => ProductFetcher.update(data.name, {
    published: status,
  }))

  return (
    <Paper className="col-span-1 flex flex-col overflow-hidden">
      <div className={"w-full h-64 relative overflow-hidden"}>
        {!!source && <Image fill src={source} alt={"Фото продукту"} className="hover:scale-105 transition duration-700 transform"/>}
        {!source && (
          <div className={"w-full h-full flex flex-col gap-y-2 items-center justify-center select-none text-neutral-500 font-light"}>
            <AiOutlinePicture className={"text-9xl"}/>
            Продукт не має головної картинки
          </div>
        )}

        <Paper className="absolute top-2 right-2 p-1 bg-white/75" onClick={handleClick}>
          <FaEllipsisVertical className="text-2xl"/>
        </Paper>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          disableScrollLock

        >
          <MenuItem onClick={editHandler}> Редагувати </MenuItem>
          <MenuItem onClick={deleteHandler}> Видалити </MenuItem>
          <MenuItem onClick={productStatusHandler(false)}> Архівувати </MenuItem>
          <MenuItem onClick={productStatusHandler(true)}> Опублікувати </MenuItem>
        </Menu>

      </div>
      <div className="flex flex-col p-4">
        <div className="text-xl line-clamp-2 font-bold">{data.name}</div>
        <div className="text-base text-neutral-500">{data.category_name}</div>
      </div>
      <Divider/>
      <div className="flex flex-row items-center justify-between mt-auto p-4">
        <div>
          <span className="text-xl p-2 border-[1px] rounded border-green-400 bg-green-100 border-solid">
            {data?.variants[0]?.price} грн.
          </span>
        </div>
        <div>
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
      </div>
    </Paper>
  )
}