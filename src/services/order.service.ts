import {axiosBasic, axiosWithAuth} from "@/services/axios/axios.interceptors";
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

  static async getMany(query?: string) {
    return await axiosWithAuth.get<{items: IOrder[], count: number}>(this.URL + (query ? `?${query}`: "" ))
  }

  static async changeOrderStatus(id: number, status: "PROCESSING" | "FULFILLED") {
    return await axiosWithAuth.patch(`${this.URL}/status/${id}`, {status})
  }
}