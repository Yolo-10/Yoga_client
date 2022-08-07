import request from './request';

export const LoginApi = (data: any) => request.get('/api/login', data);

export const AddClassApi = (data: any) =>
  request.post('/api/init/addClass', data);
export const GetMonClassApi = (data: any) =>
  request.get('/api/init/getMonClass', data);
export const GetTodayClassApi = (data: any) =>
  request.get('/api/init/getTodayClass', data);

export const GetSignupUsersApi = (data: any) =>
  request.get('/api/dea/getSignupUsers', data);
export const GetClassByIdApi = (data: any) =>
  request.get('/api/dea/getClassById', data);
export const AddDefaultApi = (data: any) =>
  request.post('/api/dea/addDefault', data);
