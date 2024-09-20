import {axiosBasic, axiosWithAuth} from "@/services/axios/axios.interceptors";
import {IReview} from "@/interfaces";

export class ReviewService {
  private static URL: string = "/reviews"

  static async getMany(product_name: string, queries?: string) {
    return await axiosBasic.get<{ items: IReview[], count: number }>(this.URL + `?product_name=${product_name}` + ( !!queries ? `&${queries}` : ''));
  }

  static async create(data: Pick<IReview, "body" | "name" | "surname" | "product_name">) {
    return await axiosWithAuth.post(this.URL, data)
  }
}