import {axiosBasic, axiosWithAuth} from "@/services/axios/axios.interceptors";
import {IPhoto, IProduct} from "@/interfaces";
import {SearchQuery} from "@/utils/SearchQuery";

export default class ProductFetcher {
  static URL = "/products"

  static async fetchOne(name: string) {
    return (await axiosWithAuth.get(`${this.URL}/${name}`)).data
  }

  static async fetchMany(searchQuery: string = "") {
    return (await axiosBasic.get<{
      items: IProduct[],
      count: number
    }>(this.URL + (Boolean(searchQuery) ? `?${searchQuery}` : ""))).data;
  }

  static deleteOne(identifier: string) {
    return axiosWithAuth.delete(`/products/${identifier}`)
  }

  static deleteMany() {

  }

  static async getNameById(id: number): Promise<Pick<IProduct, "name">> {
    return (await axiosWithAuth.get(URL + `/name/${id}`)).data
  }

  static update(name: string, data: Partial<IProduct>) {
    return axiosWithAuth.patch(`${this.URL}/${name}`, data)
  }

  static async getCatalog(searchQuery: string = "") {
    return (await axiosBasic.get<{
      items: IProduct[], count: number
    }>(`${this.URL}/catalog/list` + (Boolean(searchQuery) ? `?${searchQuery}` : ""))).data
  }

  static async getOneWithDetails(name: string) {
    return (await axiosBasic.get<IProduct>(`${this.URL}/${name}/with_details`)).data
  }


  static async getAdminCatalog(searchQuery: string = "") {
    return (await axiosWithAuth.get<{
      items: IProduct[], count: number
    }>(`${this.URL}/admin-catalog/list` + (Boolean(searchQuery) ? `?${searchQuery}` : ""))).data
  }
}

