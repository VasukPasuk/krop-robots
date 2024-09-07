import {axiosBasic, axiosWithAuth} from "@/services/axios/axios.interceptors";
import {IPhoto, IProduct} from "@/interfaces";
import {SearchQuery} from "@/utils/SearchQuery";

export default class ProductFetcher {
  static URL = "/products"

  static async fetchOne(name: string): Promise<IProduct[]> {
    try {
      const res = await axiosWithAuth.get(`${this.URL}/${name}` + SearchQuery.arrayFormat);
      return res.data
    } catch (error) {
      throw new Error(error.message)
    }
  }

  static async fetchMany(searchQuery: string = "") {
    return (await axiosBasic.get<{
      items: IProduct[],
      count: number
    }>(this.URL + (Boolean(searchQuery) ? `?${searchQuery}` : ""))).data;
  }

  static deleteOne() {
    try {
      return
    } catch (error) {
      throw new Error(error.message)
    }
  }

  static deleteMany() {
    try {
      return
    } catch (error) {
      throw new Error(error.message)
    }
  }

  static async getNameById(id: number): Promise<Pick<IProduct, "name">> {
    return (await axiosWithAuth.get(URL + `/name/${id}`)).data
  }

  static update(name: string, data: Pick<IProduct, "description" | "name" | "popular" | "discount">) {
    return axiosWithAuth.patch(`${this.URL}/${name}`, data)
  }

  static async getCatalog(searchQuery: string = "") {
    return (await axiosWithAuth.get<{
      items: IProduct[], count: number
    }>(`${this.URL}/catalog/list` + (Boolean(searchQuery) ? `?${searchQuery}` : ""))).data
  }
}

