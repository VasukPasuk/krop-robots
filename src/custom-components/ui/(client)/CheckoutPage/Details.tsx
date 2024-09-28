import {Button} from "@mui/material";
import {useContext} from "react";
import {CustomerCartContext} from "@/context/CustomerCartContext";

function Details() {
  const {cartItems} = useContext(CustomerCartContext)
  const totalLength = Object.values(cartItems).reduce(((prev, item) => prev + item.amount), 0)
  const totalPrice = Object.values(cartItems).reduce(((prev, item) => prev + item.amount * item.variant.price), 0)
  return (
    <div className="checkout_block">
      <div className="text-3xl">
        Деталі
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xl">{totalLength} товарів на суму</span>
        <span className="text-2xl font-semibold">{totalPrice} грн.</span>
      </div>
      <div className="flex justify-between items-center py-8 px-4 rounded border border-solid border-gray-200">
        <span className="text-xl">
          До сплати
        </span>
        <span className="text-2xl font-semibold">
          {totalPrice} грн.
        </span>
      </div>
      <Button variant="contained" color="success" type="submit">
        ПІДТВЕРДИТИ ЗАМОВЛЕННЯ
      </Button>
    </div>
  )
}

export default Details