"use client"

import {CustomerCartContext, ICustomerCartData} from "@/context/CustomerCartContext";
import getImageSrc from "@/features/getImageSrc";
import {useContext, useRef, useState} from "react";
import {IconButton, Menu, MenuItem} from "@mui/material";
import {FaEllipsisVertical, FaPlus} from "react-icons/fa6";
import {MdDelete} from "react-icons/md";
import {IoTrashBin} from "react-icons/io5";
import {FaMinus} from "react-icons/fa";
import {BiMinus} from "react-icons/bi";

interface ICheckoutCartItem {
  data: ICustomerCartData
  keyHash: string
}

function CheckoutCartItem({data,keyHash}:ICheckoutCartItem) {
  const {deleteItem, decreaseAmountHandler, increaseAmountHandler} = useContext(CustomerCartContext)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = {
    "Видалити": {
      foo: () => {
        handleClose()
        deleteItem(keyHash)
      },
      icon: <IoTrashBin/>
    },
    "Додати": {
      foo: () => {
        handleClose()
        increaseAmountHandler(keyHash)
      },
      icon: <FaPlus/>
    },
    "Відняти": {
      foo: () => {
        handleClose()
        decreaseAmountHandler(keyHash)
      },
      icon: <BiMinus/>
    },
  }

  return (
    <div className="flex flex-row gap-x-4 p-4 rounded-md border border-solid border-gray-200">
      <div className="min-[380px]:w-36 w-24 min-[380px]:h-32 h-24 rounded overflow-hidden">
        <img src={getImageSrc(data.photo)} alt="Фото товару" className="w-full h-full object-cover"/>
      </div>
      <div className="flex flex-col h-full">
        <div className="text-2xl font-bold">
          {data.product.name}
        </div>
        <div className="text-sm">
          {data.product.category_name}
        </div>
        <div className="text-sm">
          Кількість: {data.amount}
        </div>
        <div className="text-sm">
          Ціна: {data.amount * data.variant.price}
        </div>
        <div className="text-sm">
          Колір: {data.color.name}
        </div>
        <div className="text-sm">
          Пластик: {data.plastic}
        </div>
      </div>
      <div className="ml-auto">
        <IconButton
          onClick={handleClick}
        >
          <FaEllipsisVertical/>
        </IconButton>
        <Menu
          id="long-menu"
          disableScrollLock
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}

        >
          {Object.entries(options).map(([name, config]) => (
            <MenuItem key={name} className="flex items-center gap-x-4 justify-between" onClick={config.foo}>
              {name}
              {config.icon}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  )
}



export default CheckoutCartItem