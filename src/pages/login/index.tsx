import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './index.less'
import { LoginApi } from '@/services/api';

export default function Login() {
  const onFinish = (values: any) => {
    LoginApi({
      params: {
        u_id: values.u_id,
        password: values.password,
      }
    }).then(res => {
      if (res.status == 0)
        message.success("登录成功,即将跳转");
    }).catch(err => console.log(err))
  };

  return (
    <div className='page_login'>
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
            <Input prefix={<UserOutlined className="site-form-item-icon" style={{ 'color': '#bfbfbf' }} />} placeholder="工号" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" style={{ 'color': '#bfbfbf' }} />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>

          <Form.Item>
            <a className="login-form-register" href="">
              注册
            </a>

            <a className="login-form-forgot" href="">
              忘记密码？
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>

    </div>
  )
}
