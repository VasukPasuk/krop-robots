"use client"
import {useContext} from "react";
import {CustomerCartContext} from "@/context/CustomerCartContext";
import CheckoutCartItem from "@/custom-components/ui/(client)/CheckoutPage/CheckoutCartItem";

function CartList() {
  const {cartItems} = useContext(CustomerCartContext)
  return (
    <div className="p-4 shadow rounded flex flex-col gap-y-4">
      <div className="text-2xl">
        Товари до замовлення
      </div>
      <div className="grid auto-rows-auto gap-4 sm:grid-cols-2">
        {Object.entries(cartItems).map(([name, data]) => (
          <CheckoutCartItem key={name} keyHash={name} data={data}/>
        ))}
      </div>
    </div>

  )
}

export default CartList