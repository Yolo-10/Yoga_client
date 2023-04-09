import axios from 'axios';
import jwt from '@/util/token';
import { BASE_URL } from '@/constant/config';
import { message } from 'antd';

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
    switch (errRes.status) {
      case 401:
        jwt.removeToken();
        window.location.href = '/login';
        break;
      case 666:
        message.error(error.response.data.message);
        break;
      default:
        message.error(error.message);
    }
    return Promise.reject(error);
  },
);

export default instance;
