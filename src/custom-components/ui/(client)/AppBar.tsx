"use client"
import {Tooltip} from "@mui/material";
import {MdNotifications, MdShoppingCart} from "react-icons/md";
import {FaUser} from "react-icons/fa6";
import CartDrawer from "@/custom-components/ui/(client)/CartDrawer";
import {useState} from "react";

function AppBar() {
  const [activeCardDrawer, setActiveCardDrawer] = useState<boolean>(false)


  return (
    <div className="w-full h-16 mt-16 flex justify-end items-center px-4 gap-x-4">

      <Tooltip title="Кабінет">
        <div className="cursor-pointer text-neutral-700 transition-colors duration-700 ease-out hover:bg-black/15 rounded p-2">
          <FaUser className="text-2xl"/>
        </div>
      </Tooltip>

      <Tooltip title="Повідомлення">
        <div className="cursor-pointer text-neutral-700 transition-colors duration-700 ease-out hover:bg-black/15 rounded p-2">
          <MdNotifications className="text-2xl"/>
        </div>
      </Tooltip>

      <Tooltip title="Кошик">
        <div
          onClick={() => setActiveCardDrawer(true)}
          className="cursor-pointer text-neutral-700 transition-colors duration-700 ease-out hover:bg-black/15 rounded p-2"
        >
          <MdShoppingCart className="text-2xl"/>
        </div>
      </Tooltip>

      <CartDrawer handleClose={() => setActiveCardDrawer(false)} open={activeCardDrawer}/>
    </div>
  )
}

export default AppBar;