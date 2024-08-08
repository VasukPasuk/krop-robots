"use client"
import React, {useState} from 'react';
import {Button, IconButton, Modal, Typography} from "@mui/material";
import {MdShoppingCart} from "react-icons/md";
import {Box} from "@mui/system";
import CartItem from "@/custom-components/ui/CartItem/CartItem";

interface IShopUpperBarProps {
  children: React.ReactNode
}

function ShopUpperBar() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <nav className="h-[48px] z-50 w-full flex flex-row items-center justify-end fixed shadow bg-white pl-4 pr-4">
        <IconButton color="info" onClick={() => handleOpen()}>
          <MdShoppingCart/>
        </IconButton>
      </nav>



      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock
        className="flex justify-center items-center"
      >
        <div className="flex flex-col bg-white p-8 rounded gap-y-4 2xl:w-[40%] xl:w-[30%] lg:w-[20%] md:w-[40%] sm:w-[80%]">
          <Typography variant="h5" className="mb-5">
            Кошик
          </Typography>
          <div className="flex flex-col gap-y-4 max-h-[28rem] overflow-y-auto">
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
              <Button variant="contained" color="success" className="normal-case">
                Оформити замовлення
              </Button>
              <Button variant="outlined" color="warning" className="normal-case">
                Очистити кошик
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ShopUpperBar