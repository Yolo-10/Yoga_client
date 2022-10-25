import request from './request';

export const LoginApi = (data: any) => request.get('/login', data);
export const RegApi = (data: any) => request.post('/register', data);

export const AddClassApi = (data: any) => request.post('/init/addClass', data);
export const GetMonClassApi = (data: any) =>
  request.get('/init/getMonClass', data);
export const GetDayClassApi = (data: any) =>
  request.get('/init/getDayClass', data);
export const GetMonSignupNumApi = (data: any) =>
  request.get('/init/getMonSignupNum', data);

export const GetSignupUsersApi = (data: any) =>
  request.get('/dea/getSignupUsers', data);
export const GetClassByIdApi = (data: any) =>
  request.get('/dea/getClassById', data);
export const GetBlackTimeApi = (data: any) =>
  request.get('/dea/getBlackTime', data);
export const AddDefaultApi = (data: any) =>
  request.post('/dea/addDefault', data);
export const SignupClassApi = (data: any) =>
  request.post('/dea/signupClass', data);
export const DelSignupClassApi = (data: any) =>
  request.post('/dea/delSignupClass', data);
export const DelDefApi = (data: any) => request.post('/dea/delDef', data);
