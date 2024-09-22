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


    product.variants.forEach((variant, index) => {
      reqFormData.append("variants", JSON.stringify({variant}));
    });

    product.photos.forEach((photo, index) => {
      reqFormData.append('photos', photo, `photo_${index}.jpg`);
    });

    product.tags.forEach((tag, index) => {
      reqFormData.append('tags', tag);
    });

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
