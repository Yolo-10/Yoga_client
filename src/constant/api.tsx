import request from '../util/request';

export const API_LOGIN = '/login';
export const API_REGISTER = '/register';
export const API_MON_CLASS = '/getMonClass';
export const API_DAY_CLASS = '/getDayClass';
export const API_ADD_CLASS = '/addClass';
export const API_SIGN_UP_USERS = '/getSignupUsers';
export const API_CLASS_BY_ID = '/getClassById';
export const API_ADD_DEFAULT = '/addDefault';
export const API_SIGN_UP = '/signupClass';
export const API_DEL_SIGN_UP = '/delSignupClass';
export const API_DEL_DEF = '/delDef';

export const get = (url: string, data: any) =>
  request.get(url, { params: data });
export const post = (url: string, data: any) => request.post(url, data);
