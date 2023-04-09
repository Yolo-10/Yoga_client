import { message } from 'antd';
import { API_REGISTER, post } from '@/constant/api';
import { FormCom } from '@/components';
import './index.less';

export default function Register() {
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
      message.success(`${res.message},跳转至登录页`);
      setTimeout(() => {
        (window.location.href = '/login'), 2;
      });
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
