import { useState } from 'react';
import { useModel } from 'umi';
import {
  Button,
  Radio,
  Col,
  TimePicker,
  message,
  Drawer,
  Form,
  Input,
  InputNumber,
} from 'antd';
import moment from 'moment';
import { API_ADD_CLASS, post } from '@/constant/api';
import { addFormProps } from '../PropInterfaces';
import './index.less';

const AddForm = (props: addFormProps) => {
  const {
    initialState: { userInfo },
  } = useModel('@@initialState');
  const { canAdd, choseDay, setIsAdd } = props;
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showDrawer = () => {
    canAdd ? (setVisible(true), setIsAdd(false)) : null;
  };
  const onClose = () => {
    setVisible(false);
  };
  const onFinish = async () => {
    const { c_name, began_time, time_step, place, p_limit } =
      form.getFieldsValue();
    //计算整个课程的时间段
    let end_time = moment(began_time).add(time_step, 'minutes');
    let time =
      choseDay +
      ' ' +
      began_time.format('HH:mm') +
      '-' +
      end_time.format('HH:mm');

    //当前已过开课时间
    moment().isAfter(
      moment(choseDay + ' ' + began_time.format('HH:mm')),
      'minutes',
    )
      ? message.error('上课时间早于当前')
      : //发送请求
        await post(API_ADD_CLASS, { c_name, time, place, p_limit }).then(
          (res) => {
            setVisible(false);
            message.success('添加成功');
            form.resetFields();
            setIsAdd(true);
          },
        );
  };

  // 加减事件
  const changeNumber = (
    who: string,
    add: boolean,
    step: number,
    minV: number,
    maxV: number,
  ) => {
    let { [who]: before } = form.getFieldsValue(); //变量key
    let newValue = add ? before + step : before - step;
    if (newValue > maxV || newValue < minV) {
      message.error(`超过既定范围`);
      return;
    }
    form.setFieldsValue({ [(() => who)()]: newValue });
  };

  //加减事件注册 + 图标声明
  const addIcon2 = (
    <div onClick={() => changeNumber('p_limit', true, 1, 4, 12)}>+</div>
  );
  const reduceIcon2 = (
    <div onClick={() => changeNumber('p_limit', false, 1, 4, 12)}>-</div>
  );

  return (
    //不是管理员,无权添加
    userInfo?.u_type != 0 ? (
      <></>
    ) : (
      <div>
        <Button
          className={canAdd ? 'add_icon' : 'add_icon cannot_add'}
          onClick={showDrawer}
          disabled={!canAdd}
        >
          添加
        </Button>
        <Drawer
          title="添加课程"
          width={'417px'}
          onClose={onClose}
          open={visible}
        >
          <Form
            layout="vertical"
            form={form}
            hideRequiredMark
            initialValues={{
              c_name: 'yoga',
              place: '师生活动中心228',
              p_limit: 10,
              began_time: moment('17:00', 'HH:mm'),
              time_step: '90',
            }}
          >
            <Col span={24}>
              <Form.Item name="c_name" label="" rules={[{ required: true }]}>
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="yoga">瑜伽</Radio.Button>
                  {/* <Radio.Button value="go">围棋</Radio.Button>
                  <Radio.Button value="badminton">羽毛球</Radio.Button> */}
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="上课时间" name="began_time">
                <TimePicker
                  minuteStep={30}
                  format={'HH:mm'}
                  showNow={false}
                  inputReadOnly
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="时长(分钟)" name="time_step">
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="60">60</Radio.Button>
                  <Radio.Button value="75">75</Radio.Button>
                  <Radio.Button value="90">90</Radio.Button>
                  <Radio.Button value="120">120</Radio.Button>
                  <Radio.Button value="150">150</Radio.Button>
                  <Radio.Button value="180">180</Radio.Button>
                </Radio.Group>
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
            <Col span={12}>
              <Form.Item
                name="p_limit"
                label="人数"
                rules={[{ required: true, message: '请输入课程人数' }]}
              >
                <InputNumber
                  min={4}
                  max={12}
                  controls={false}
                  addonBefore={reduceIcon2}
                  addonAfter={addIcon2}
                  readOnly
                />
              </Form.Item>
            </Col>
          </Form>

          <div className="btn_ope">
            <Button onClick={onClose} style={{ float: 'left' }}>
              取消
            </Button>
            <Button
              onClick={onFinish}
              type="primary"
              style={{ float: 'right', margin: '0 0 0 20px' }}
            >
              提交
            </Button>
          </div>
        </Drawer>
      </div>
    )
  );
};

export default AddForm;
