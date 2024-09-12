import {Button, Drawer, IconButton, Typography} from "@mui/material";
import {MdClose} from "react-icons/md";
import React, {useEffect, useState} from "react";
import {clearProductCart, getAllCartItems, UserCartItemType} from "@/features/localStorageFunctions";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import CartItem from "@/custom-components/ui/CartItem/CartItem";

interface ICartDrawerProps {
  open: boolean
  handleClose: (val: boolean) => void | boolean
}


function CartDrawer(props: ICartDrawerProps) {
  const {handleClose, open} = props;
  const [items, setItems] = useState<{ [key: string]: UserCartItemType }>({});

  const router = useRouter()

  const clearCartHandler = () => {
    setItems(clearProductCart())
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

  const cartItems = Object.entries(items).map(([key, value]) => (
    <CartItem refreshFn={refreshHandler} data={value} propertyHash={key} key={key}/>
  ))
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
        {Object.keys(items).length ? (
          cartItems
        ):(
          <div className={"mt-64 text-neutral-600"}>
            Ваш кошик пустий :(
          </div>
        )}
      </div>
      <div className="container flex flex-col gap-y-4 items-start justify-between">
        <Typography variant="h6">
          Загальна ціна {totalPrice} грн.
        </Typography>
        <div className="flex flex-row items-center justify-end gap-x-6 self-end">
          <Button size={"medium"} variant="contained" color="success" className="normal-case" onClick={purchaseCartHandler}>
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

export default CartDrawer;