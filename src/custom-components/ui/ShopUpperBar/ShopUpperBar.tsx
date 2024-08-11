"use client"
import React, {useCallback, useState} from 'react';
import {Button, IconButton, Input, Modal, Typography} from "@mui/material";
import {MdSearch, MdShoppingCart} from "react-icons/md";
import {Box} from "@mui/system";
import CartItem from "@/custom-components/ui/CartItem/CartItem";
import CartModal from "@/custom-components/ui/CartModal/CartModal";

interface IShopUpperBarProps {
  children: React.ReactNode
}

function ShopUpperBar({children}: IShopUpperBarProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <nav
        className="mt-16 h-[48px] z-50 w-full flex flex-row items-center fixed shadow bg-white pl-4 pr-4">
        {children}
        <IconButton color="info" className={"ml-auto"} onClick={() => handleOpen()}>
          <MdShoppingCart/>
        </IconButton>
      </nav>
      <CartModal handleClose={handleClose} open={open}/>
    </>
  )
}

export default ShopUpperBar

