import React from 'react';
import { useHistory, observer, inject } from 'umi';
import { message } from 'antd';
import { get, API_LOGIN } from '@/constant/api';
import './index.less';
import FormCom from '@/components/Form';

function Login({ index }) {
  const store = index;
  const history = useHistory();

  const onFinish = async (values: { u_id: number; password: string }) => {
    await get(API_LOGIN, {
      u_id: values.u_id,
      password: values.password,
    }).then((res) => {
      if (res.status == 0) {
        store.saveCurUser(res.data);
        message.success('登录成功');

        //页面跳转
        setTimeout(() => history.push('/'), 1000);
      } else {
        message.error('用户名或密码错误');
      }
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
