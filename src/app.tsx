import decode from 'jwt-decode';
import jwt from './util/token';

//初始化某些全局数据的运行时配置
export async function getInitialState() {
  //默认值
  let userState = { userInfo: null };

  //检查是否已经登录
  let info = jwt.getToken();

  if (info) {
    userState = {
      userInfo: decode(info),
    };
  }
  return userState;
}
