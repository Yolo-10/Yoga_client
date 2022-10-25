import React from 'react';
import { useHistory, useModel } from 'umi';
import { message } from 'antd';
import decode from 'jwt-decode';
import { LoginApi } from '@/services/api';
import jwt, { saveToken } from '@/util/token';
import './index.less';
import FormCom from '@/components/Form';

export default function Login() {
  const history = useHistory();
  const { initialState, setInitialState } = useModel('@@initialState');

  const onFinish = async (values: { u_id: number; password: string }) => {
    await LoginApi({
      params: {
        u_id: values.u_id,
        password: values.password,
      },
    })
      .then((res) => {
        if (res.status == 0) {
          //保存token,并提示用户
          jwt.saveToken(res.data);
          message.success('登录成功');

          //修改全局的initState,已经登录
          setInitialState({
            isLogin: true,
            userInfo: decode(res.data),
          });

          //页面跳转
          setTimeout(() => history.push('/'), 1000);
        } else {
          message.error('用户名或密码错误');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <FormCom
      onFinish={onFinish}
      confirmNeed={false}
      option="登录"
      link={{ src: '/register', str: '未有账号?前往注册' }}
    />
  );
}
