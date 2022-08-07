import decode from 'jwt-decode';

const TOKEN_KEY = 'yoga_token';
const USER_KEY = 'yoga_user';

export const getToken = () => {
  return window.localStorage.getItem(TOKEN_KEY);
};

export const saveToken = (data: string) => {
  window.localStorage.setItem(TOKEN_KEY, data);
  window.localStorage.setItem(USER_KEY, JSON.stringify(decode(data)));
};

export const removeToken = () => {
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
};

export const decodeToken = () => {
  return decode(window.localStorage.getItem(TOKEN_KEY));
};

export const getUser = () => {
  return JSON.parse(window.localStorage.getItem(USER_KEY));
};

export default { getToken, saveToken, removeToken, decodeToken, getUser };
