import {axiosWithAuth} from "@/services/axios/axios.interceptors";
import {ICategory} from "@/interfaces";

type CategoryDTO = Pick<ICategory, "name" | "description">

export default class CategoryFetcher {
  static url:string = "/categories"

  static async getMany(pagination: string) {
    return (await axiosWithAuth.get<{items: ICategory[], count: number}>(this.url + (pagination ? `?${pagination}` : ""))).data;
  }

  static async create(data: CategoryDTO) {
    return axiosWithAuth.post(this.url, data)
  }

  static async delete(categoryName: string) {
    return axiosWithAuth.delete(this.url + `/${categoryName}`)
  }

  static async deleteAll() {
    return axiosWithAuth.delete(this.url)
  }

  static async update(categoryName: string, data: Partial<CategoryDTO>) {
    return axiosWithAuth.patch(this.url + `/${categoryName}`, data)
  }
}