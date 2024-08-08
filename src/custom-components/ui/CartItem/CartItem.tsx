import React, {useState} from 'react';
import {Button, Card, CardActions, CardContent, IconButton, Input, Typography} from "@mui/material";
import Image from "next/image";
import {MdHorizontalRule, MdPlusOne} from "react-icons/md";
import {FaPlus} from "react-icons/fa6";
import {BiSolidTrash} from "react-icons/bi";
import {toast} from "react-toastify";

function CartItem() {
  const [amount, setAmount] = useState(1)

  const increaseAmountHandler = () => setAmount(prev => ++prev)
  const decreaseAmountHandler = () => setAmount(prev => prev != 1 ? prev - 1 : prev)

  const deleteCartItemHandler = () => {
    toast.success(`Товар "${"name"}" було видалено з кошику`)
  }

  return (
    <div>
      <Card className="flex h-full flex-col w-full">
        <CardContent className="h-full container flex flex-row gap-x-4">
          <div className="relative overflow-hidden rounded w-[100px] h-[100px]">
            <Image fill src={"/ProductTestImage.webp"} alt={"Cart product item"}/>
          </div>
          <div>
            <Typography variant="h5" className="text-neutral-900 text-[1.345rem] font-bold">
              Product
            </Typography>
            <Typography variant="h6" className="text-neutral-500 text-[.85rem]">
              Accessory
            </Typography>
          </div>
        </CardContent>
        <CardActions className="flex items-center justify-between px-4">
          <div className="flex flex-row justify-center items-center gap-x-2">
            <Typography variant="h5" className="text-neutral-800">
              {100*amount} грн.
            </Typography>
            <Typography variant="h6" className="text-neutral-500 line-through text-[.95rem]">
              {Math.round(100*amount*1.12)} грн.
            </Typography>
          </div>
          <div className="flex justify-start items-start gap-x-4">
            <IconButton color="primary" onClick={increaseAmountHandler}>
              <FaPlus className="text-xl"/>
            </IconButton>
            <Input className="w-12" slotProps={{input: {style: {textAlign: "center"} }}} defaultValue={1} value={amount} >
            </Input>
            <IconButton color="error" onClick={decreaseAmountHandler}>
              <MdHorizontalRule className="text-xl" />
            </IconButton>
          </div>
          <div>
            <IconButton color="error" onClick={deleteCartItemHandler}>
              <BiSolidTrash className="text-2xl" />
            </IconButton>
          </div>
        </CardActions>
      </Card>
    </div>
  )
}

export default CartItem