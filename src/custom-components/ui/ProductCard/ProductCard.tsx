"use client"
import React from 'react';
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {IoCart} from "react-icons/io5";
import Image from "next/image";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

interface IProductCardProps {
  children?: React.ReactNode
}

function ProductCard(props: IProductCardProps) {
  const {} = props;

  const router = useRouter()

  const onAddToCartHandler = () => {
    toast.success("Товар додано до Вашого кошика.")
  }

  const clickCardHandler = () => {
    router.push("/shop/products/1")
  }

  return (
    <Card className="flex flex-col justify-between pt-1 pb-1 min-h-64 hover:shadow-xl cursor-pointer" onClick={clickCardHandler}>
      <CardContent className="flex flex-row h-full">
        <div className="w-[80%] bg-amber-400 relative rounded overflow-hidden">
          <Image fill alt={"Product image"} src={"/ProductTestImage.webp"} className="hover:scale-110 transition duration-700" />
        </div>
        <div className="container w-full flex flex-col pl-3">
          <Typography variant="h5" className="text-neutral-900 text-[1.45rem] font-bold">
            Назва
          </Typography>
          <Typography variant="h6" className="text-neutral-600 text-[.95rem]">
            Аксесуар
          </Typography>
        </div>
      </CardContent>
      <CardActions className="flex justify-end">
        <Button size="small" variant="text" onClick={onAddToCartHandler}>
          <IoCart size={24}/>
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard