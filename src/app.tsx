import decode from 'jwt-decode';

//初始化某些全局数据的运行时配置
export async function getInitialState() {
  //默认值
  let userState = {
    isLogin: false,
    userInfo: null,
  };

  //检查是否已经登录
  let info = localStorage.getItem('yoga_token');

  if (info) {
    userState = {
      isLogin: true,
      userInfo: decode(info),
    };
  }
  return userState;
}
