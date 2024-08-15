"use client"
import React from 'react';
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {IoCart} from "react-icons/io5";
import Image from "next/image";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {Product} from "@prisma/client";

interface IProductCardProps {
  children?: React.ReactNode
  product: Partial<Product>
}

function ProductCard(props: IProductCardProps) {
  const {product: {category_name, name, image_name, id}} = props;

  const router = useRouter()

  const onAddToCartHandler = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    router.push(`/shop/products/${id}`)
  }

  const clickCardHandler = () => {
    router.push(`/shop/products/${id}`)
  }

  return (
    <Card className="flex text-neutral-800 dark:text-neutral-200 dark:bg-neutral-600/25 flex-col justify-between pt-1 pb-1 min-h-64 hover:shadow-xl cursor-pointer" onClick={clickCardHandler}>
      <CardContent className="flex flex-row h-full">
        <div className="bg-amber-400 rounded overflow-hidden relative flex items-center justify-center">
          <Image
            width={325}
            height={325}
            alt={"Product image"}
            src={`https://drive.google.com/uc?export=view&id=${image_name}`}
            className="hover:scale-110 transition duration-700 w-[325px] h-[175px]"
          />
        </div>
        <div className="container w-full flex flex-col pl-3">
          <Typography variant="h5" className=" text-[clamp(0.985rem,3cqw,1.35rem)] font-bold">
            {name}
          </Typography>
          <Typography variant="h6" className=" text-[.95rem]">
            {category_name}
          </Typography>
        </div>
      </CardContent>
      <CardActions className="flex justify-end">
        <Button  size="small" variant="text" onClick={onAddToCartHandler}>
          Перейти до продукту
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard