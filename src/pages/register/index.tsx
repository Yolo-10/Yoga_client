import React from 'react';
import { useHistory } from 'umi';
import { message } from 'antd';
import { API_REGISTER, post } from '@/constant/api';
import './index.less';
import FormCom from '@/components/Form';

export default function Register() {
  const history = useHistory();
  const onFinish = async (values: {
    u_id: number;
    password: string;
    u_name: number;
  }) => {
    await post(API_REGISTER, {
      u_id: values.u_id,
      u_name: values.u_name,
      password: values.password,
    }).then((res) => {
      if (res.status === 0) {
        message.success(`${res.message},跳转至登录页`);
        setTimeout(() => {
          history.push('/login'), 2;
        });
      } else message.error(res.message);
    });
  };

  return (
    <div className="page_reg">
      <FormCom
        onFinish={onFinish}
        confirmNeed={true}
        option="注册"
        link={{ src: '/login', str: '去登录' }}
      />
    </div>
  );
}
