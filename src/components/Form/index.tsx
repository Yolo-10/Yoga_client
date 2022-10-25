import React from 'react';
import { useHistory, useModel, Link } from 'umi';
import { Button, Form, Input } from 'antd';
import { Svg } from '@/components';
import './index.less';
import { FormComProps } from '../PropInterfaces';

export default function FormCom(props: FormComProps) {
  const { onFinish, confirmNeed, option, link } = props;
  const history = useHistory();

  const returnInit = () => {
    history.push('/');
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
            rules={[{ required: true, message: '请输入姓名!' }]}
          >
            <Input
              prefix={
                <div className="icon_box">
                  <Svg id={'usr'} size={24} color={`#bfbfbf`} />
                </div>
              }
              placeholder="姓名"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
            hasFeedback
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

          {confirmNeed && (
            <Form.Item
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: '请再次输入密码!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次输入密码不一致!'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={
                  <div className="icon_box">
                    <Svg id={'lock1'} size={24} color={`#bfbfbf`} />
                  </div>
                }
                type="password"
                placeholder="确认密码"
              />
            </Form.Item>
          )}

          <div className="a-box">
            <Link to={link.src}>{link.str}</Link>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              {option}
            </Button>
          </Form.Item>
          <Button type="primary" danger className="cancel" onClick={returnInit}>
            取消
          </Button>
        </Form>
      </div>
    </div>
  );
}