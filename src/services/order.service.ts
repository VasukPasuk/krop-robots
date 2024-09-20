import {IOrderRequestData} from "@/app/(shop)/shop/checkout/page";
import {axiosBasic} from "@/services/axios/axios.interceptors";

export class OrderService {
  static URL = "/orders"

  static create(data: IOrderRequestData) {
    return axiosBasic.post("/orders", data)
  }
}