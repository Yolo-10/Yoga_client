import React from 'react';
import { observer, inject } from 'umi';
import { message } from 'antd';
import { get, API_LOGIN } from '@/constant/api';
import './index.less';
import FormCom from '@/components/Form';

function Login({ index }) {
  const store = index;

  const onFinish = async (values: { u_id: number; password: string }) => {
    await get(API_LOGIN, {
      u_id: values.u_id,
      password: values.password,
    }).then((res) => {
      store.saveCurUser(res.data);
      console.log(333, store);
      message.success('登录成功');
      // setTimeout(() => window.location.href = '/', 1000);
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

export default inject('index')(observer(Login));
