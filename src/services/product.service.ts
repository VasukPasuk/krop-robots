import {IProduct, IVariant} from "@/interfaces";
import {axiosWithAuth} from "@/services/axios/axios.interceptors";

export default class ProductService {
  static baseUrl: string = "/products";

  static async create(product: {
    variants: Omit<IVariant, "updated_at" | "created_at" | "id">[],
    photos: File[],
    tags: string[]
  } & Pick<IProduct, "name" | "description" | "category_name">) {

    const reqFormData = new FormData();



    reqFormData.append("variants", JSON.stringify([...product.variants]))

    product.photos.forEach((photo, index) => {
      reqFormData.append('photos', photo, `photo_${index}.jpg`);
    });

    reqFormData.append('tags', JSON.stringify(product.tags));
    reqFormData.append('name', product.name);
    reqFormData.append('description', product.description);
    reqFormData.append('category_name', product.category_name);

    return await axiosWithAuth.post(`${this.baseUrl}`, reqFormData, {
      headers: {
        "Content-Type": 'multipart/form-data'
      }
    })
  }
}
