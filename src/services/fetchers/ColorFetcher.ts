import {axiosWithAuth} from "@/services/axios/axios.interceptors";
import {IColor, IProduct} from "@/interfaces";

export default class ColorFetcher {
  static url:string = "/colors"

  static async getAll(queries: string = "") {
    return (await axiosWithAuth.get<{items: IColor[], count: number}>(this.url + queries)).data
  }

  static async getOne(name: string) {
    return (await axiosWithAuth.get(`${this.url}/${name}`)).data
  }

  static async delete(name: string) {
    return axiosWithAuth.delete(`${this.url}/${name}`)
  }

  static async update(id: number, data: Pick<IColor, "name" | "hex">) {
    return axiosWithAuth.patch(`${this.url}/${id}`, data)
  }

  static async deleteAll() {
    return axiosWithAuth.delete(`${this.url}`)
  }

  static async create(data: Pick<IColor, "name" | "hex">) {
    return axiosWithAuth.post(this.url, data)
  }
}