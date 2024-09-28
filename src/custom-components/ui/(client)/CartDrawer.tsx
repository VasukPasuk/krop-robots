"use client"
import React, {useContext, useState} from 'react';
import {Button, Drawer, IconButton, Typography} from "@mui/material";
import CartItem from "@/custom-components/ui/CartItem/CartItem";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {MdClose} from "react-icons/md";
import {CustomerCartContext} from "@/context/CustomerCartContext";

interface ICartModalProps {
  open: boolean
  handleClose: (val: boolean) => void | boolean
}

function CartModal(props: ICartModalProps) {
  const {cartItems, clearCart} = useContext(CustomerCartContext)
  const {handleClose, open} = props;

  const router = useRouter()

  const clearCartHandler = () => {
    clearCart()
    toast.success("Кошик з Вашими товарами очищено")
  }
  const purchaseCartHandler = () => {
    handleClose(false)
    router.push("/shop/checkout")
  }

  const totalPrice = Object.keys(cartItems).reduce((total, key) => {
    return total + cartItems[key].variant.price * cartItems[key].amount;
  }, 0);


  return (
    <Drawer
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableScrollLock
      className="w-1/2"
      anchor={"right"}
      classes={{paperAnchorRight: "gap-y-4 p-6 flex flex-col justify-center items-center w-full sm:w-[460px]"}}
    >
      <div className={"flex w-full flex-row justify-between items-center"}>
        <Typography variant="h4">
          Кошик
        </Typography>
        <IconButton onClick={() => handleClose(false)}>
          <MdClose/>
        </IconButton>
      </div>
      <div className="h-full flex flex-col gap-y-4 overflow-y-auto pr-4 py-4">
        {Object.keys(cartItems).map((key) => (
          <CartItem data={cartItems[key]} propertyHash={key} key={key}/>
        ))}
      </div>
      <div className="container flex flex-col gap-y-4 items-start justify-between">
        <Typography variant="h6">
          Загальна ціна {totalPrice} грн.
        </Typography>
        <div className="flex flex-row items-center justify-end gap-x-6 self-end">
          <Button size={"medium"} variant="contained" color="success" className="normal-case"
                  onClick={purchaseCartHandler}>
            Оформити замовлення
          </Button>
          <Button size={"medium"} variant="outlined" color="warning" className="normal-case" onClick={clearCartHandler}>
            Очистити кошик
          </Button>
        </div>
      </div>
    </Drawer>
  )
}

export default CartModal