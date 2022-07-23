import {
  Button, Radio, Col, TimePicker, message,
  Drawer, Form, Input, Row, InputNumber, Slider
} from 'antd';
import { useState } from 'react'
import type { SliderMarks } from 'antd/es/slider';
import moment from 'moment';


const AddForm = (props: any) => {
  const { canAdd } = props;
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showDrawer = () => {
    canAdd ? setVisible(true) : null;
  };
  const onClose = () => { setVisible(false); };

  // 加减事件
  const changeNumber = (who: string, add: boolean, step: number, minV: number, maxV: number) => {
    let { [who]: before } = form.getFieldsValue();  //变量key
    let newValue = add ? before + step : before - step;
    if (newValue > maxV || newValue < minV) {
      message.error(`超过 ${minV} ~ ${maxV} 范围`);
      return;
    }
    form.setFieldsValue({ [(() => who)()]: newValue })
    updateNa_money();
  };

  //更新非预约金额
  const updateNa_money = () => {
    //从表单数据中获取值
    let { nm_money, p_limit } = form.getFieldsValue();
    form.setFieldsValue({ 'na_money': ((nm_money / p_limit) * 1.5).toFixed(2) });
  }

  //加减事件注册 + 图标声明
  const addIcon1 = (
    <div onClick={() => (changeNumber('nm_money', true, 10, 300, 500))}>+</div>);
  const reduceIcon1 = (
    <div onClick={() => (changeNumber('nm_money', false, 10, 300, 500))}>-</div>)
  const addIcon2 = (
    <div onClick={() => (changeNumber('p_limit', true, 1, 5, 12))}>+</div>);
  const reduceIcon2 = (
    <div onClick={() => (changeNumber('p_limit', false, 1, 5, 12))}>-</div>)

  //滑动条的数值提示
  const timeMarks: SliderMarks = {
    60: '60',
    90: '90',
    120: '120',
  }

  return (
    <div>
      <Button className={canAdd ? "add_icon" : "add_icon cannot_add"}
        onClick={showDrawer}>添加</Button>
      <Drawer
        title="添加课程"
        width={'417'}
        onClose={onClose}
        visible={visible}>
        <Form layout="vertical"
          form={form}
          hideRequiredMark
          initialValues={{
            'c_name': 'yoga',
            'place': '师生活动中心2-108',
            'nm_money': 400,
            'na_money': 60.00,
            'p_limit': 10,
            "began_time": moment('17:00', 'HH:mm'),
            "time_step": 90,
          }}>
          <Col span={24}>
            <Form.Item
              name="c_name"
              label=""
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
              label="上课时间"
              name="began_time">
              <TimePicker minuteStep={30} format={'HH:mm'}
                showNow={false} inputReadOnly />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="时长(分钟)"
              name="time_step">
              <Slider step={30} min={60} max={120} marks={timeMarks} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="place"
              label="地点"
              rules={[{ required: true, message: '请输入地点' }]}
            >
              <Input placeholder="请输入地点" allowClear={true} />
            </Form.Item>
          </Col>
          <Row gutter={10}>
            <Col span={16}>
              <Form.Item
                name="nm_money"
                label="普通金额（300元 ~ 500元）"
                rules={[{ required: true, message: '请输入普通金额' }]}>
                <InputNumber min={300} max={500} controls={false}
                  addonBefore={reduceIcon1} addonAfter={addIcon1} readOnly />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="na_money"
                label="非预约金额"
                rules={[{ required: true, message: '请输入非预约金额' }]}>
                <Input placeholder="请输入非预约金额" readOnly style={{ 'border': '0' }} />
              </Form.Item>
            </Col>
          </Row>
          <Col span={24}>
            <Form.Item
              name="p_limit"
              label="人数（5 ~ 12）"
              rules={[{ required: true, message: '请输入课程人数' }]}>
              <InputNumber min={5} max={12} controls={false}
                addonBefore={reduceIcon2} addonAfter={addIcon2}
                style={{ 'width': 200 + 'px' }} readOnly />
            </Form.Item>
          </Col>
        </Form>

        <Button onClick={onClose} type="primary" style={{ 'float': 'right' }}>提交</Button>
      </Drawer>
    </div >

  )
}

export default AddForm;