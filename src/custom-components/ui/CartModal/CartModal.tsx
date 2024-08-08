import React from 'react';
import {Button, Modal, Typography} from "@mui/material";
import CartItem from "@/custom-components/ui/CartItem/CartItem";
import {toast} from "react-toastify";

interface ICartModalProps {
  open: boolean
  handleClose: (val: boolean) => void | boolean
}

function CartModal(props: ICartModalProps) {
  const {handleClose, open} = props;

  const clearCartHandler = () => {
    toast.success("Кошик з Вашими товарами очищено")
  }
  const purchaseCartHandler = () => {
    toast.success("Вітаємо з успішною покупкою!", {autoClose: false, position: "bottom-center"})
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableScrollLock
      className="flex justify-center items-center"
    >
      <div
        className="flex flex-col bg-white p-8 rounded gap-y-4 2xl:w-[40%] xl:w-[30%] lg:w-[20%] md:w-[40%] sm:w-[80%]">
        <Typography variant="h5" className="mb-5">
          Кошик
        </Typography>
        <div className="flex flex-col gap-y-4 max-h-[28rem] overflow-y-auto pr-4 py-4">
          <CartItem/>
          <CartItem/>
          <CartItem/>
          <CartItem/>
          <CartItem/>
          <CartItem/>
          <CartItem/>
        </div>
        <div className="container flex flex-row items-center justify-between">
          <Typography variant="h6">
            Загальна ціна 1000 грн.
          </Typography>
          <div className="flex flex-row items-center justify-end gap-x-6">
            <Button variant="contained" color="success" className="normal-case" onClick={purchaseCartHandler}>
              Оформити замовлення
            </Button>
            <Button variant="outlined" color="warning" className="normal-case" onClick={clearCartHandler}>
              Очистити кошик
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default CartModal