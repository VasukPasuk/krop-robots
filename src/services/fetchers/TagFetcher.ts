import {axiosWithAuth} from "@/services/axios/axios.interceptors";
import {ITag} from "@/interfaces";

export default class TagFetcher {
  static URL:string = "/tags"
  static deleteOneByName(name: string) {
    return axiosWithAuth.delete(`${this.URL}/${name}`)
  }
  static updateOneByName(name: string, data: {name: string, description?: string}) {
    return axiosWithAuth.patch(`${this.URL}/${name}`, data)
  }
  static async getAllTags(query: string = "") {
    return (await axiosWithAuth.get<{items: ITag[], count: number}>(this.URL + (query ? `?${query}`: ""))).data
  }


  static async getTagsRelatedToProduct(productName: string, query: string = "") {
    return (await axiosWithAuth.get<{items: ITag[], count: number}>(`/products-have-tags/products/${productName}` + (query ? `?${query}`: ""))).data
  }

  static async attachTagToProduct(tagName: string, productName:string) {
    return axiosWithAuth.post(`/products-have-tags/attach`, {tag_name: tagName, product_name: productName})
  }

  static async unpinTagFromProduct(tagName: string, productName:string) {
    return axiosWithAuth.delete(`/products-have-tags/unpin/${decodeURI(tagName)}/${decodeURI(productName)}`)
  }

}