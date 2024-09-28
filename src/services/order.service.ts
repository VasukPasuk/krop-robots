import {IOrderRequestData} from "@/app/(shop)/shop/checkout/_page";
import {axiosBasic} from "@/services/axios/axios.interceptors";
import {IOrder} from "@/interfaces";




export interface CreateOrderDTO extends Omit<IOrder, "id" | "created_at" | "updated_at">{
  items: {
    colorName: string
    productName: string
    variantId: number
    plastic: "PLA" | "CoPET"
    amount: number
    price: number
  }[]
}

export class OrderService {
  static URL = "/orders"

  static create(data: CreateOrderDTO) {
    return axiosBasic.post("/orders", data)
  }
}