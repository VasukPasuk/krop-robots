import {IconButton, Paper, Tooltip, Typography} from '@mui/material';
import React, {useContext} from 'react';
import {deleteProduct, deleteProductAndReturn, UserCartItemType} from "@/features/localStorageFunctions";
import {IoMdTrash} from "react-icons/io";
import {CustomerCartContext, ICustomerCartData} from "@/context/CustomerCartContext";

interface ICheckoutCartItem {
  data: ICustomerCartData
  hashKey: string
  deleteFn: (key: string) => void
}

function CheckoutCartItem({data, hashKey, deleteFn}: ICheckoutCartItem) {

  const deleteFromCartHandler = () => {
    deleteFn(hashKey)
  }

  return (
    <Paper variant={"outlined"} className={"flex flex-col lg:flex-row items-center justify-center lg:px-6 lg:py-4"}>
      <div className={"w-full flex flex-row items-center justify-start gap-x-4 p-2"}>
        <div className="relative h-32 w-32">
          <img
            className={"rounded overflow-hidden w-full h-full"}
            alt={`Картинка продукту ${data.product.name}`}
            src={process.env.NEXT_PUBLIC_API_URL + "/static/" + data.photo}
          />
        </div>
        <div className={"flex flex-col"}>
          <div className="text-lg font-bold">{data.product.name}</div>
          <div>{data.product.category_name}</div>
          <div>Кількість: {data.amount}</div>
          <div>Ціна: {data.amount * data.variant.price} грн</div>
          <div>Пластик: {data.plastic}</div>
          <div>Колір: {data.color.name}</div>
        </div>

      </div>
      <div className={"ml-auto flex flex-row items-center justify-center p-2"}>
        <Tooltip title="Видалити з кошика">
          <IconButton color={"error"} onClick={deleteFromCartHandler}>
            <IoMdTrash/>
          </IconButton>
        </Tooltip>
      </div>
    </Paper>
  )
}

export default CheckoutCartItem