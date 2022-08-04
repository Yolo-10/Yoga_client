import axios from 'axios';

const axiosOption = {
  // baseURL: 'api',
  baseURL: 'http://110.42.230.161/',
};

const instance = axios.create(axiosOption);

instance.interceptors.request.use(
  (config) => {
    let yoga_token = localStorage.getItem('yoga_token');
    if (yoga_token) {
      config.headers = {
        yoga_token: yoga_token,
      };
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
