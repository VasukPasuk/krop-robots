import {axiosWithAuth} from "@/services/axios/axios.interceptors";

export default class PhotoFetcher {
  static URL:string = "/photos"
  static deleteOneById(id: number) {
    return axiosWithAuth.delete(`${this.URL}/${id}`)
  }
  static createOne(file: File, productName:string ) {
    const formData = new FormData();
    formData.append("photos", file, `${productName}_photo_${Date.now()}`);
    formData.append("product_name", productName);
    return axiosWithAuth.post(this.URL, formData);
  }

}