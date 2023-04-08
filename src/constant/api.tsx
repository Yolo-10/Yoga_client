import request from '../util/request';

export const API_LOGIN = '/login';
export const API_REGISTER = '/register';
export const API_MON_CLASS = '/init/getMonClass';
export const API_DAY_CLASS = '/init/getDayClass';
export const API_ADD_CLASS = '/init/addClass';
export const API_SIGN_UP_USERS = '/dea/getSignupUsers';
export const API_CLASS_BY_ID = '/dea/getClassById';
export const API_ADD_DEFAULT = '/dea/addDefault';
export const API_SIGN_UP = '/dea/signupClass';
export const API_DEL_SIGN_UP = '/dea/delSignupClass';
export const API_DEL_DEF = '/dea/delDef';

export const get = (url: string, data: any) =>
  request.get(url, { params: data });
export const post = (url: string, data: any) => request.post(url, data);
