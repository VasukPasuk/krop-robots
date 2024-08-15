import {IconButton, Paper, Typography} from '@mui/material';
import React from 'react';
import {deleteProduct, UserCartItemType} from "@/features/localStorageFunctions";
import {IoMdTrash} from "react-icons/io";
import Image from "next/image";
import {getAllProducts} from "@/services/actions/productActions";
interface ICheckoutCartItem {
  data: UserCartItemType
  hashKey: string
  updateCartStateFn: (state: any) => void
}

function CheckoutCartItem({data, hashKey, updateCartStateFn}: ICheckoutCartItem) {

  const deleteFromCartHandler = () => {
    deleteProduct(hashKey)
    updateCartStateFn(getAllProducts())
  }

  return (
    <Paper variant={"outlined"} className={"flex flex-row items-center justify-center px-6 py-4"}>
      <div className={"w-full flex flex-row items-center justify-start gap-x-4"}>
        <Image className={"rounded overflow-hidden"} width={150} height={150} alt={`Картинка продукту ${data.product.name}`} src={`https://drive.google.com/uc?export=view&id=${data.product.image_name}`}/>
        <div className={"flex flex-col"}>
          <Typography variant={"h6"} className={"font-bold text-neutral-800"}>
            {data.product.name}
          </Typography>
          <Typography variant={"subtitle1"} className={"font-bold text-neutral-800"}>
            {data.product.category_name}
          </Typography>
        </div>
        <div>
          <Typography variant={"subtitle1"} className={"font-bold text-neutral-800"}>
            Розмірність/вага:
          </Typography>
          <Typography variant={"subtitle1"} className={"font-bold text-neutral-700"}>
            {data.variant.length}
          </Typography>
        </div>

        <Typography variant={"subtitle1"} className={"font-bold text-neutral-800"}>
          Кількість: {data.amount}
        </Typography>
        <Typography variant={"h6"} className={"font-bold text-neutral-800"}>
          Ціна: {data.amount * data.variant.price} грн
        </Typography>
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