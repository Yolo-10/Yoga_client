import axios from 'axios';

const axiosOption = {
  baseURL: 'api',
}

const instance = axios.create(axiosOption);

instance.interceptors.request.use(
  config => { return config },
  error => { return Promise.reject(error) }
)

instance.interceptors.response.use(
  response => { return response.data; },
  error => { return Promise.reject(error) }
)

export default instance;