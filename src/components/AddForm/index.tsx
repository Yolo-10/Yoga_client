import {
  Button, Radio, Col, DatePicker,
  Drawer, Form, Input, Row, TimePicker
} from 'antd';
import type { DatePickerProps } from 'antd';
import { useState } from 'react'


const AddForm = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div>
      <Button className='add_icon' onClick={showDrawer}>添加</Button>
      <Drawer
        title="课程"
        width={'417'}
        onClose={onClose}
        visible={visible}>
        <Form layout="vertical" hideRequiredMark>
          <Col span={24}>
            <Form.Item
              name="c_name"
              label="课程"
              rules={[{ required: true }]}>
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="yoga" >瑜伽</Radio.Button>
                <Radio.Button value="b">围棋</Radio.Button>
                <Radio.Button value="c">羽毛球</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="time"
              label="时间"
              rules={[{ required: true, message: '请输入时间' }]}>
              <div style={{ 'display': 'flex' }}>
                <DatePicker
                  onChange={onChange}
                  format="YYYY-MM-DD" />
                <TimePicker.RangePicker
                  minuteStep={30}
                  format='HH:mm' />
              </div>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="place"
              label="地点"
              rules={[{ required: true, message: '请输入地点' }]}
            >
              <Input placeholder="请输入地点" />
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
              label="人数"
              rules={[{ required: true, message: '请输入课程人数' }]}>
              <Input placeholder="请输入人数" />
            </Form.Item>
          </Col>
        </Form>

        <Button onClick={onClose} type="primary">提交</Button>
      </Drawer>
    </div>

  )
}

export default AddForm;