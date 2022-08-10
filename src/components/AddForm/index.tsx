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
  Row,
  InputNumber,
} from 'antd';
import moment from 'moment';
import { AddClassApi } from '@/services/api';

const AddForm = (props: any) => {
  const {
    initialState: { isLogin, userInfo },
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
    const { c_name, began_time, time_step, place, nm_money, p_limit } =
      form.getFieldsValue();
    //计算整个课程的时间段
    let end_time = moment(began_time).add(time_step, 'minutes');
    let time =
      choseDay +
      ' ' +
      began_time.format('HH:mm') +
      '-' +
      end_time.format('HH:mm');
    //发送请求
    await AddClassApi({ c_name, time, place, nm_money, p_limit })
      .then((res) => {
        if (res.status === 1) {
          setVisible(false);
          message.success('添加成功');
          form.resetFields();
          setIsAdd(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
  const addIcon1 = (
    <div onClick={() => changeNumber('nm_money', true, 10, 300, 500)}>+</div>
  );
  const reduceIcon1 = (
    <div onClick={() => changeNumber('nm_money', false, 10, 300, 500)}>-</div>
  );
  const addIcon2 = (
    <div onClick={() => changeNumber('p_limit', true, 1, 5, 12)}>+</div>
  );
  const reduceIcon2 = (
    <div onClick={() => changeNumber('p_limit', false, 1, 5, 12)}>-</div>
  );

  return (
    //不登录或是学员时，无权添加
    !isLogin || userInfo?.u_type == 1 ? (
      <></>
    ) : (
      <div>
        <Button
          className={canAdd ? 'add_icon' : 'add_icon cannot_add'}
          onClick={showDrawer}
        >
          添加
        </Button>
        <Drawer
          title="添加课程"
          width={'417px'}
          onClose={onClose}
          visible={visible}
        >
          <Form
            layout="vertical"
            form={form}
            hideRequiredMark
            initialValues={{
              c_name: 'yoga',
              place: '师生活动中心2-108',
              nm_money: 400,
              na_money: 60.0,
              p_limit: 10,
              began_time: moment('17:00', 'HH:mm'),
              time_step: '90',
            }}
          >
            <Col span={24}>
              <Form.Item name="c_name" label="" rules={[{ required: true }]}>
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="yoga">瑜伽</Radio.Button>
                  <Radio.Button value="go">围棋</Radio.Button>
                  <Radio.Button value="badminton">羽毛球</Radio.Button>
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
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  name="nm_money"
                  label="普通金额"
                  rules={[{ required: true, message: '请输入普通金额' }]}
                >
                  <InputNumber
                    min={300}
                    max={500}
                    controls={false}
                    addonBefore={reduceIcon1}
                    addonAfter={addIcon1}
                    readOnly
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="p_limit"
                  label="人数"
                  rules={[{ required: true, message: '请输入课程人数' }]}
                >
                  <InputNumber
                    min={5}
                    max={12}
                    controls={false}
                    addonBefore={reduceIcon2}
                    addonAfter={addIcon2}
                    readOnly
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>

          <div className="btn_ope">
            <Button onClick={onClose} style={{ float: 'left' }}>
              取消
            </Button>
            <Button
              onClick={onFinish}
              type="primary"
              style={{ float: 'right' }}
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
