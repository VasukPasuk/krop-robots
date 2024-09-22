import React, {useState} from 'react';
import {Button, Card, CardActions, CardContent, IconButton, Input, Typography} from "@mui/material";
import {MdHorizontalRule, MdPlusOne} from "react-icons/md";
import {FaPlus} from "react-icons/fa6";
import {BiSolidTrash} from "react-icons/bi";
import {toast} from "react-toastify";
import {
  decrementProduct,
  deleteProduct,
  incrementProduct,
  setProductToCart,
  UserCartItemType
} from "@/features/localStorageFunctions";


interface ICartItemProps {
  data: UserCartItemType
  propertyHash: string
  refreshFn: () => void
}

function CartItem({data, propertyHash, refreshFn}: ICartItemProps) {
  const increaseAmountHandler = () => {
    incrementProduct(propertyHash)
    refreshFn()
  }
  const decreaseAmountHandler = () => {
    decrementProduct(propertyHash)
    refreshFn()
  }

  const deleteCartItemHandler = () => {
    deleteProduct(propertyHash)
    refreshFn()
    toast.success(`Товар " ${data.product.name} " було видалено з кошику`)
  }

  return (
    <div>
      <Card className="flex h-full flex-col w-full">
        <CardContent className="h-full container flex flex-row gap-x-4">
          <div className="relative overflow-hidden rounded w-[150px] h-[110px] s420:h-[150px]">
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}/static/${data.photo}`}
              alt={"Cart product item"}
            />
          </div>
          <div>
            <Typography variant="h5" className="text-neutral-900 text-[1.345rem] font-bold">
              {data.product.name}
            </Typography>
            <Typography variant="h6" className="text-neutral-700 text-[1rem]">
              {data.product.category_name}
            </Typography>
            <Typography variant="h6" className="text-neutral-600 text-[.85rem]">
              Колір: {data.color.name}
            </Typography>
            <Typography variant="h6" className="text-neutral-600 text-[.85rem]">
              Розмірність ВхШхД: {data.variant.height} x {data.variant.width} x {data.variant.length}
            </Typography>
            <Typography variant="h6" className="text-neutral-600 text-[.85rem]">
              Вага: {data.variant.weight} грам
            </Typography>
            <Typography variant="h6" className="text-neutral-600 text-[.85rem]">
              Вид пластику: {data.plastic}
            </Typography>
          </div>
        </CardContent>
        <CardActions className="flex items-center justify-between px-4 s420:flex-row">
          <div className="flex flex-row justify-center items-center gap-x-2">
            <Typography variant="h5" className="text-neutral-800 text-lg sm:text-2xl">
              {data.variant.price * data.amount} грн.
            </Typography>
          </div>
          <div className="flex flex-row justify-start items-start gap-x-4">
            <IconButton onClick={increaseAmountHandler}>
              <FaPlus className="text-sm s420:text-xl"/>
            </IconButton>
            <Input className="w-6" slotProps={{input: {style: {textAlign: "center"}}}} defaultValue={1}
                   value={data.amount}>
            </Input>
            <IconButton onClick={decreaseAmountHandler}>
              <MdHorizontalRule className="text-sm s420:text-xl"/>
            </IconButton>
          </div>
          <div>
            <IconButton color="error" onClick={deleteCartItemHandler}>
              <BiSolidTrash className="text-2xl"/>
            </IconButton>
          </div>
        </CardActions>
      </Card>
    </div>
  )
}

export default CartItem