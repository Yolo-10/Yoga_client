import axios from 'axios';
import { encodeJWT } from './token';

const BASE_URL = {
  baseURL: 'api',
  // baseURL: 'http://110.42.230.161/',
};

const instance = axios.create(BASE_URL);

instance.interceptors.request.use(
  (config) => {
    let yoga_token = localStorage.getItem('yoga_token');
    if (yoga_token) {
      config.headers.Authorization = encodeJWT(yoga_token);
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
    return Promise.reject(error);
  },
);

export default instance;
