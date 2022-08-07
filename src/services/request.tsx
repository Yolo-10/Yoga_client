import axios from 'axios';
import jwt from '@/util/token';

const BASE_URL = {
  // baseURL: 'api',
  baseURL: 'http://110.42.230.161/',
};

const instance = axios.create(BASE_URL);

instance.interceptors.request.use(
  (config) => {
    let yoga_token = jwt.getToken();
    if (yoga_token) {
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
      setTimeout(() => {
        window.location.href = '/login';
      }, 2);
    }
    return Promise.reject(error);
  },
);

export default instance;
