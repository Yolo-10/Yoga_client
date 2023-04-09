import React from 'react';
import { useModel } from 'umi';
import { message } from 'antd';
import { get, API_LOGIN } from '@/constant/api';
import jwt, { saveToken } from '@/util/token';
import './index.less';
import FormCom from '@/components/Form';

function Login() {
  const { initialState, setInitialState } = useModel('@@initialState');

  const onFinish = async (values: { u_id: number; password: string }) => {
    await get(API_LOGIN, {
      u_id: values.u_id,
      password: values.password,
    }).then((res) => {
      jwt.saveToken(res.data);
      message.success('登录成功');
      setTimeout(() => (window.location.href = '/'), 1000);
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

export default Login;
