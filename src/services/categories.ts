import {axiosInstance} from "@/services/axios/axiosInstance";
import {Category} from "@prisma/client";
import {API_URLS} from "@/services/enums";


class CategoriesApi {
  async getAll() {
    return (await axiosInstance.get<Category[]>(API_URLS.CATEGORIES)).data
  }
  async getOne(name: string) {
    return (await axiosInstance.get<Category>(API_URLS.CATEGORIES)).data
  }
}