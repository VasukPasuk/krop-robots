import {IconButton, Paper, Typography} from '@mui/material';
import React from 'react';
import {deleteProduct, deleteProductAndReturn, UserCartItemType} from "@/features/localStorageFunctions";
import {IoMdTrash} from "react-icons/io";
import Image from "next/image";

interface ICheckoutCartItem {
  data: UserCartItemType
  hashKey: string
  updateCartStateFn: (state: any) => void
}

function CheckoutCartItem({data, hashKey, updateCartStateFn}: ICheckoutCartItem) {

  const deleteFromCartHandler = () => {
    updateCartStateFn(deleteProductAndReturn(hashKey))
  }

  return (
    <Paper variant={"outlined"} className={"flex flex-col lg:flex-row items-center justify-center lg:px-6 lg:py-4"}>
      <div className={"w-full flex flex-col lg:flex-row items-center justify-start gap-x-4"}>
        <div className="relative h-32 w-32">
          <Image
            className={"rounded overflow-hidden "}
            fill
            alt={`Картинка продукту ${data.product.name}`}
            src={process.env.NEXT_PUBLIC_API_URL + "/" + data.photo}
          />
        </div>
        <div className={"flex flex-col"}>
          <div>{data.product.name}</div>
          <div>{data.product.category_name}</div>
          <div>Кількість: {data.amount}</div>
          <div>Ціна: {data.amount * data.variant.price} грн</div>
        </div>

      </div>
      <div className={"ml-auto flex flex-row items-center justify-center"}>
        <IconButton color={"error"} onClick={deleteFromCartHandler}>
          <IoMdTrash/>
        </IconButton>
      </div>
    </Paper>
  )
}

export default CheckoutCartItem