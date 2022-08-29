import request from './request';

export const LoginApi = (data: any) => request.get('/api/login', data);

export const AddClassApi = (data: any) =>
  request.post('/api/init/addClass', data);
export const GetMonClassApi = (data: any) =>
  request.get('/api/init/getMonClass', data);
export const GetDayClassApi = (data: any) =>
  request.get('/api/init/getDayClass', data);
export const GetMonSignupNumApi = (data: any) =>
  request.get('/api/init/getMonSignupNum', data);

export const GetSignupUsersApi = (data: any) =>
  request.get('/api/dea/getSignupUsers', data);
export const GetClassByIdApi = (data: any) =>
  request.get('/api/dea/getClassById', data);
export const GetBlackTimeApi = (data: any) =>
  request.get('/api/dea/getBlackTime', data);
export const AddDefaultApi = (data: any) =>
  request.post('/api/dea/addDefault', data);
export const SignupClassApi = (data: any) =>
  request.post('/api/dea/signupClass', data);
export const DelSignupClassApi = (data: any) =>
  request.post('/api/dea/delSignupClass', data);
