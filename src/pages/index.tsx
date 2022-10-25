import { useEffect, useState } from 'react';
import { useHistory, useModel } from 'umi';
import { Calendar, message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { Moment } from 'moment';
import moment from 'moment';
import { GetMonClassApi, GetDayClassApi } from '@/services/api';
import { AddForm, Svg, Header, CalSelect, DateCell } from '@/components';
import { classInfo } from '@/components/PropInterfaces';
import jwt from '@/util/token';
import './index.less';

const IndexPage = () => {
  const { confirm } = Modal;
  const { initialState, setInitialState } = useModel('@@initialState');
  const history = useHistory();
  const [canAdd, setCanAdd] = useState(true);
  const [choseDay, setChoseDay] = useState(moment().format('YYYY-MM-DD'));
  const [choseMonth, setChoseMonth] = useState(moment().format('YYYY-MM'));
  const [isAdd, setIsAdd] = useState(false);
  const [monClassArr, setMonClassArr] = useState([]);
  const [todayClassArr, setTodayClassArr] = useState([]);

  //弹出确认退出账号框
  const showConfirm = () => {
    confirm({
      title: `确认退出账号吗? `,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        jwt.removeToken();
        setInitialState({
          userInfo: null,
        });
        window.location.href = '/';
        message.success('退出账号');
      },
    });
  };

  //登录、退出
  const userLogin = () => {
    let token = jwt.getToken();
    if (token) {
      //退出账号
      showConfirm();
    } else {
      history.push('/login');
    }
  };

  //选择日期发生变化的回调
  const calChange = (value: Moment) => {
    //设置添加按钮的开启
    if (value.isSame(moment(), 'day')) {
      setCanAdd(true);
      return;
    }
    value.isAfter(moment()) ? setCanAdd(true) : setCanAdd(false);
    //设置添加课程的默认日期
    setChoseDay(value.format('YYYY-MM-DD'));
  };

  //月历面板发生变化的回调
  const onPanelChange = (value: Moment) => {
    //用于搜索月历页面的课程
    setChoseMonth(value.format('YYYY-MM'));
  };

  //获取某月的课程信息
  const getMonClass = async (month: string) => {
    await GetMonClassApi({ params: { Mon: month } })
      .then((res) => {
        if (res.status === 1) {
          setMonClassArr(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  //获取某天的课程信息---当天
  const getTodayClass = async (day: string) => {
    await GetDayClassApi({ params: { Today: day } })
      .then((res) => {
        if (res.status === 1) {
          setTodayClassArr(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  //日历课程动态监听
  useEffect(() => {
    getMonClass(choseMonth);
  }, [choseMonth, isAdd]);

  //头部信息
  useEffect(() => {
    getTodayClass(moment().format('YYYY-MM-DD'));
  }, [isAdd]);

  // useEffect(()=>{
  //   console.log('环境变量：', process.env, process.env.UMI_ENV);
  // },[]);

  return (
    <div className="page_init">
      {todayClassArr.map((item: classInfo) => {
        return (
          <Header
            key={item.c_id}
            time={item.time.substring(5)}
            place={item.place}
            c_name={item.c_name}
          />
        );
      })}

      <div className="m_body">
        <Calendar
          onChange={calChange}
          fullscreen={false}
          headerRender={({ value, onChange }) => (
            <div className="m-calHeader">
              <div className="icon_box" onClick={userLogin}>
                <Svg id={'usr'} size={24} color={`#262626`} />
              </div>
              <CalSelect value={value} onChange={onChange} />
              <AddForm
                canAdd={canAdd}
                choseDay={choseDay}
                setIsAdd={setIsAdd}
              />
            </div>
          )}
          onPanelChange={onPanelChange}
          dateCellRender={(value: Moment) => (
            <DateCell monClassArr={monClassArr} value={value} />
          )}
        />
      </div>
    </div>
  );
};

IndexPage.title = 'Home Page';
export default IndexPage;
