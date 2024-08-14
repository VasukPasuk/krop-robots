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
    toast.success("Товар додано до Вашого кошика.")
  }

  const clickCardHandler = () => {
    router.push(`/shop/products/${id}`)
  }

  return (
    <Card className="flex flex-col justify-between pt-1 pb-1 min-h-64 hover:shadow-xl cursor-pointer" onClick={clickCardHandler}>
      <CardContent className="flex flex-row h-full">
        <div className="bg-amber-400 rounded overflow-hidden relative flex items-center justify-center">
          <Image
            width={325}
            height={325}
            alt={"Product image"}
            src={`https://drive.google.com/uc?export=view&id=${image_name}`}
            className="h-full hover:scale-110 transition duration-700"
          />
        </div>
        <div className="container w-full flex flex-col pl-3">
          <Typography variant="h5" className="text-neutral-900 text-[clamp(0.985rem,3cqw,1.35rem)] font-bold">
            {name}
          </Typography>
          <Typography variant="h6" className="text-neutral-600 text-[.95rem]">
            {category_name}
          </Typography>
        </div>
      </CardContent>
      <CardActions className="flex justify-end">
        <Button  size="small" variant="text" onClick={onAddToCartHandler}>
          <IoCart size={24}/>
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard