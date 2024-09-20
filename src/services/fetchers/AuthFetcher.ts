import {axiosBasic, axiosWithAuth} from "@/services/axios/axios.interceptors";

interface ILoginCredentials {
  login: string,
  password: string
}

export default class AuthFetcher {
  static url: string = "/auth"
  static async login(data: ILoginCredentials) {
    return axiosBasic.post<{
      accessToken: string,
      user: {
        id: number,
        login: string,
        role: "ADMIN" | "CUSTOMER",
      }
    }>(`${this.url}/login`, data);
  }
}