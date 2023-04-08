import axios from 'axios';
import jwt from '@/util/token';
import { BASE_URL } from '@/constant/config';

const instance = axios.create({
  timeout: 20000,
  baseURL: BASE_URL[process.env.NODE_ENV],
});

instance.interceptors.request.use(
  (config) => {
    let yoga_token = jwt.getToken();
    //多一步判断
    if (yoga_token && config.headers) {
      // config.headers有可能是undefined类型
      config.headers['Authorization'] = `Bearer ${yoga_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const errRes = error.response;
    if (errRes.status === 401) {
      jwt.removeToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default instance;
