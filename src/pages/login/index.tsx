import React from 'react';
import { useHistory } from 'umi';
import { Button, Form, Input, message } from 'antd';
import { LoginApi } from '@/services/api';
import { Svg } from '@/components';
import './index.less';

export default function Login() {
  const history = useHistory();
  const onFinish = (values: any) => {
    LoginApi({
      params: {
        u_id: values.u_id,
        password: values.password,
      },
    })
      .then((res) => {
        if (res.status == 0) {
          localStorage.setItem('yoga_token', res.data);
          message.success('登录成功');
          setTimeout(() => history.push('/'), 1000);
        } else if (res.status == -2) {
          message.error('用户名或密码错误');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="page_login">
      <div className="m_form">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="u_id"
            rules={[{ required: true, message: '请输入工号!' }]}
          >
            <Input
              prefix={
                <div className="icon_box">
                  <Svg id={'usr'} size={24} color={`#bfbfbf`} />
                </div>
              }
              placeholder="工号"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              prefix={
                <div className="icon_box">
                  <Svg id={'lock1'} size={24} color={`#bfbfbf`} />
                </div>
              }
              type="password"
              placeholder="密码"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
