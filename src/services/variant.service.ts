import {axiosWithAuth} from "@/services/axios/axios.interceptors";
import {IVariant} from "@/interfaces";

export class VariantService {
  private static URL: string = "/variants"

  static async getManyOfProduct(product_name: string, queries?: string) {
    return await axiosWithAuth.get(`${this.URL}/products/${product_name}${queries ? `?${queries}` : ''}`)
  }

  static async create(data: Omit<IVariant, "updated_at" | "created_at" | "id">) {
    return await axiosWithAuth.post(this.URL, data)
  }

  static async delete(id: number) {
    return await axiosWithAuth.delete(`${this.URL}/${id}`)
  }

  static async deleteManyOfProduct(product_name: string) {
    return await axiosWithAuth.delete(`${this.URL}/products/${product_name}`)
  }

  static async update(id: number, data: Partial<Omit<IVariant, "updated_at" | "created_at" | "id">>) {
    return await axiosWithAuth.patch(`${this.URL}/${id}`, data)
  }
}