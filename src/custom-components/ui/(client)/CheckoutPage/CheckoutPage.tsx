"use client"
import ContactsForm from "@/custom-components/ui/(client)/CheckoutPage/ContactsForm";
import DeliveryForm from "@/custom-components/ui/(client)/CheckoutPage/DeliveryForm";
import PaymentSelect from "@/custom-components/ui/(client)/CheckoutPage/PaymentSelect";
import CommentForm from "@/custom-components/ui/(client)/CheckoutPage/CommentForm";
import Details from "@/custom-components/ui/(client)/CheckoutPage/Details";
import CartList from "@/custom-components/ui/(client)/CheckoutPage/CartList";
import {CheckoutContext} from "@/context/CheckoutContext";
import "./style.scss"
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as zod from "zod";
import {useMutation} from "@tanstack/react-query";
import {CreateOrderDTO, OrderService} from "@/services/order.service";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {useContext} from "react";
import {CustomerCartContext} from "@/context/CustomerCartContext";

const schema = zod.object({
  phone: zod
    .string()
    .min(10, {message: "Phone number must be at least 10 characters"})
    .max(15, {message: "Phone number must be at most 15 characters"})
    .regex(/^\+?[0-9]{10,15}$/, {message: "Invalid phone number format"})
    .trim(),
  email: zod
    .string()
    .email({message: "Invalid email format"})
    .trim(),
  name: zod
    .string()
    .min(1, {message: "Name is required"})
    .max(50, {message: "Name must be at most 50 characters"})
    .trim(),
  surname: zod
    .string()
    .min(1, {message: "Surname is required"})
    .max(50, {message: "Surname must be at most 50 characters"})
    .trim(),
  region: zod
    .string()
    .trim()
    .min(1)
    .max(50)
  ,
  locality: zod
    .string()
    .trim()
    .min(1)
    .max(50)
  ,
  comment: zod
    .string()
    .max(500, {message: "Comment must be at most 500 characters"})
    .optional(),
  floor: zod
    .string()
    .regex(/^[0-9]{1,2}$/, {message: "Invalid floor number"})
    .optional(),
  appartment: zod
    .string()
    .regex(/^[0-9]{1,4}$/, {message: "Invalid apartment number"})
    .optional(),
  house: zod
    .string()
    .max(20, {message: "House must be at most 20 characters"})
    .optional(),
  street: zod
    .string()
    .max(100, {message: "Street must be at most 100 characters"})
    .optional(),
  department_address: zod.string().min(1).optional(),
  payment_type: zod.enum(["Предоплата", "Повна оплата", "Рахунок для юридичних осіб"]),
  EDRPOY_CODE: zod.string().length(8).optional(),
  legal_entity: zod.string().min(1).optional(),
  delivery_type: zod.enum(["Доставка Нова Пошта", "Доставка УКРПОШТА", "Кур'єром з Нової Пошти"]),
});


export type CheckoutSchema = zod.infer<typeof schema>

function CheckoutPage() {
  const {cartItems, clearCart, totalAmount, totalPrice} = useContext(CustomerCartContext)
  const {control, handleSubmit, setValue, formState: {errors}} = useForm({
    resolver: zodResolver(schema)
  })
  const router = useRouter()

  const orderMutation = useMutation({
    mutationFn: (data: CreateOrderDTO) => OrderService.create(data),
    onSuccess: () => {
      toast.success("Замовлення створено")
      // Редірект
      // router.replace("/shop")

      // Очистити кошик
      // clearCart()
    },
    onError: () => {
      toast.error("Щось сталося не так!")
    }
  })

  const onSubmit: SubmitHandler<Required<CheckoutSchema>> = (formData) => {
    console.log(formData)
    orderMutation.mutate({
      ...formData,
      items: Object.values(cartItems).map(item => ({
        colorName: item.color.name,
        productName: item.product.name,
        variantId: item.variant.id,
        plastic: item.plastic,
        amount: item.amount,
        price: item.variant.price * item.amount
      })),
      total_items: totalAmount,
      total_price: totalPrice,
    })
  }


  return (
    <CheckoutContext.Provider value={{
      control,
      setValue
    }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex lg:gap-x-16 gap-y-4 lg:flex-0 flex-1 lg:flex-row flex-col container mx-auto py-4"
      >
        <div className="lg:w-2/3 w-full flex flex-col gap-y-12">
          <ContactsForm/>
          <DeliveryForm/>
          <PaymentSelect/>
          <CommentForm/>
          <CartList/>
        </div>
        <div className="lg:w-1/3 w-full">
          <Details/>
        </div>
      </form>
    </CheckoutContext.Provider>
  )
}

export default CheckoutPage