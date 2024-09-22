import axios, {CreateAxiosDefaults} from 'axios';
import {TOKEN_NAMES} from "@/constants/enums";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/api"

const config:CreateAxiosDefaults = {
  baseURL: API_URL,
  withCredentials: true,
}

console.log(API_URL)

const axiosWithAuth = axios.create(config);

const axiosBasic = axios.create(config);


axiosWithAuth.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(TOKEN_NAMES.ACCESS_TOKEN);
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosWithAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axiosWithAuth.get(`${API_URL}/refresh`);
        const accessToken = response.data;
        localStorage.setItem(TOKEN_NAMES.ACCESS_TOKEN, accessToken);
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return axiosWithAuth(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem(TOKEN_NAMES.ACCESS_TOKEN);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export {
  axiosBasic,
  axiosWithAuth,
}