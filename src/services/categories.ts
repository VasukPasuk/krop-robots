import {axiosWithAuth} from "@/services/axios/axios.interceptors";
import {Category} from "@prisma/client";
import {API_URLS} from "@/services/enums";


class CategoriesApi {
  async getAll() {
    return (await axiosWithAuth.get<Category[]>(API_URLS.CATEGORIES)).data
  }
  async getOne(name: string) {
    return (await axiosWithAuth.get<Category>(API_URLS.CATEGORIES)).data
  }
}