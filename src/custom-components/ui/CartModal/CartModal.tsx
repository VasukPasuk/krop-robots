import React, {useEffect, useState} from 'react';
import {Button, Drawer, IconButton, Modal, Typography} from "@mui/material";
import CartItem from "@/custom-components/ui/CartItem/CartItem";
import {toast} from "react-toastify";
import {getAllCartItems, UserCartItemType} from "@/features/localStorageFunctions";
import {useRouter} from "next/navigation";
import {MdClose} from "react-icons/md";

interface ICartModalProps {
  open: boolean
  handleClose: (val: boolean) => void | boolean
}

function CartModal(props: ICartModalProps) {
  const {handleClose, open} = props;
  const [items, setItems] = useState<{ [key: string]: UserCartItemType }>({});

  const router = useRouter()

  const clearCartHandler = () => {
    toast.success("Кошик з Вашими товарами очищено")
  }
  const purchaseCartHandler = () => {
    router.push("/shop/checkout")
  }

  const refreshHandler = () => {
    setItems(getAllCartItems())
  }

  useEffect(() => {
    setItems(getAllCartItems())
  },[])

  useEffect(() => {
    setItems(getAllCartItems())
  },[open])

  const totalPrice = Object.keys(items).reduce((total, key) => {
    return total + items[key].variant.price * items[key].amount;
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
      classes={{paperAnchorRight: "gap-y-4 p-6 flex flex-col justify-center items-center w-[460px]"}}
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
        {Object.entries(items).map(([key, value]) => (
          <CartItem refreshFn={refreshHandler} data={value} propertyHash={key} key={key}/>
        ))}
      </div>
      <div className="container flex flex-row items-center justify-between">
        <Typography variant="h6">
          Загальна ціна {totalPrice} грн.
        </Typography>
        <div className="flex flex-row items-center justify-end gap-x-6">
          <Button size={"small"} variant="contained" color="success" className="normal-case" onClick={purchaseCartHandler}>
            Оформити замовлення
          </Button>
          <Button size={"small"} variant="outlined" color="warning" className="normal-case" onClick={clearCartHandler}>
            Очистити кошик
          </Button>
        </div>
      </div>
    </Drawer>
  )
}

export default CartModal