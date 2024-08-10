"use client"
import React, {useState} from 'react';
import {Button, IconButton, Input, Modal, Typography} from "@mui/material";
import {MdSearch, MdShoppingCart} from "react-icons/md";
import {Box} from "@mui/system";
import CartItem from "@/custom-components/ui/CartItem/CartItem";
import CartModal from "@/custom-components/ui/CartModal/CartModal";

interface IShopUpperBarProps {
  children: React.ReactNode
}

function ShopUpperBar() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <nav className="mt-16 h-[48px] z-50 w-full flex flex-row items-center justify-between fixed shadow bg-white pl-4 pr-4">
        <div>

        </div>

        <div className="flex flex-row items-center justify-center gap-x-2 w-1/4">
          <Input className="w-full" placeholder="Пошук товару...">

          </Input>
          <Button className="normal-case text-[.85rem]" variant="contained" endIcon={<MdSearch className="text-2xl" />}>
            Знайти
          </Button>
        </div>


        <IconButton color="info" onClick={() => handleOpen()}>
          <MdShoppingCart/>
        </IconButton>
      </nav>
      <CartModal handleClose={handleClose} open={open}/>
    </>
  )
}

export default ShopUpperBar