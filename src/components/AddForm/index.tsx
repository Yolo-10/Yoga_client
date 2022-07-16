import { useState } from 'react'
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Space } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

const AddForm = () => {
  const [visible, setVisible] = useState(false);
  const RangePicker: any = DatePicker.RangePicker;
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };


  return (
    <div>
      <PlusCircleOutlined className='add_icon' onClick={showDrawer} />
      <Drawer
        title="新增课程"
        width={'417'}
        onClose={onClose}
        visible={visible}
        extra={
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button onClick={onClose} type="primary">提交</Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Col span={24}>
            <Form.Item
              name="c_id"
              label="课程id"
              rules={[{ required: true, message: '请输入课程id' }]}>
              <Input placeholder="请输入课程id" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="c_name"
              label="课程名"
              rules={[{ required: true, message: '请输入课程名' }]}>
              <Input placeholder="请输入课程名" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="time"
              label="上课时间"
              rules={[{ required: true, message: '请输入上课时间' }]}>
              <RangePicker
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="place"
              label="上课地点"
              rules={[{ required: true, message: '请输入上课地点' }]}
            >
              <Input placeholder="请输入上课地点" />
            </Form.Item>
          </Col>
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item
                name="nm_money"
                label="普通金额"
                rules={[{ required: true, message: '请输入普通金额' }]}>
                <Input placeholder="请输入普通金额" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="na_money"
                label="非预约金额"
                rules={[{ required: true, message: '请输入非预约金额' }]}>
                <Input placeholder="请输入非预约金额" />
              </Form.Item>
            </Col>
          </Row>
          <Col span={24}>
            <Form.Item
              name="p_limit"
              label="课程人数"
              rules={[{ required: true, message: '请输入课程人数' }]}>
              <Input placeholder="请输入课程人数" />
            </Form.Item>
          </Col>
        </Form>
      </Drawer>
    </div>

  )
}

export default AddForm;