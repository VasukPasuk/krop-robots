import axios, {CreateAxiosDefaults} from 'axios';

const config:CreateAxiosDefaults = {
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: true,
}


const axiosWithAuth = axios.create(config);

const axiosBasic = axios.create(config);



export {
  axiosBasic,
  axiosWithAuth,
}