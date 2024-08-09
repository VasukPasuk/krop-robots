"use client"
import React from 'react';
import MyModal from "@/custom-components/ui/MyModal/MyModal";
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import Image from "next/image";
import {MdOutlineAddShoppingCart, MdOutlineRemoveShoppingCart, MdShoppingCart} from "react-icons/md";
import {toast} from "react-toastify";

export default function ProductModalPage({ params: { id } }: { params: { id: string } }) {

  const onAddToShoppingCartHandler = () => {
    toast.success("Товар додано до кошика")
  }
  const onRemoveFromShoppingCartHandler = () => {
    toast.success("Товар вилучено з кошика")
  }

  return (
    <MyModal>
      <Card className="p-4">
        <CardContent className="flex flex-row gap-x-4">
          <div className="w-96 h-48 relative overflow-hidden rounded">
            <Image alt="Product image" src="/ProductTestImage.webp" fill/>
          </div>
          <div className="w-full">
            <Typography variant="h5" className="text-[1.325rem] text-neutral-800 font-bold">
              Product
            </Typography>
            <Typography variant="h6" className="text-[1.125rem] text-neutral-700 ">
              Category
            </Typography>
            <Typography variant="h6" className="text-[1rem] text-neutral-700 ">
              Body
            </Typography>
          </div>
        </CardContent>
        <CardActions className="flex flex-row justify-between items-center p-4">
          <div>
            <Typography variant="h6">
              Ціна за шт
            </Typography>
          </div>
          <div className="flex flex-row gap-x-4">
            <Button onClick={onAddToShoppingCartHandler} size="medium" className="normal-case" variant="contained" color="primary" endIcon={<MdOutlineAddShoppingCart/>}>
              Додати
            </Button>
            <Button onClick={onRemoveFromShoppingCartHandler} size="medium" disabled className="normal-case" variant="contained" color="error" endIcon={<MdOutlineRemoveShoppingCart/>}>
              Вилучити
            </Button>
          </div>
        </CardActions>
      </Card>
    </MyModal>
  )
}