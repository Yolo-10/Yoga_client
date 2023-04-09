import { useEffect, useState } from 'react';
import { Link, useModel } from 'umi';
import { Calendar, message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { Moment } from 'moment';
import moment from 'moment';
import { API_DAY_CLASS, API_MON_CLASS, get } from '@/constant/api';
import { AddForm, Svg, Header, CalSelect } from '@/components';
import { classInfo } from '@/components/PropInterfaces';
import jwt from '@/util/token';
import './index.less';

const IndexPage = () => {
  const { confirm } = Modal;
  const [canAdd, setCanAdd] = useState(true);
  const { setInitialState } = useModel('@@initialState');
  const [choseDay, setChoseDay] = useState(moment().format('YYYY-MM-DD'));
  const [choseMonth, setChoseMonth] = useState(moment().format('YYYY-MM'));
  const [isAdd, setIsAdd] = useState(false);
  const [monClassArr, setMonClassArr] = useState([]);
  const [todayClassArr, setTodayClassArr] = useState([]);

  //弹出确认退出账号框
  const doConfirm = () => {
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
      doConfirm();
    } else {
      window.location.href = '/login';
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
    await get(API_MON_CLASS, { Mon: month }).then((res) => {
      setMonClassArr(res.data);
    });
  };

  //获取某天的课程信息---当天
  const getTodayClass = async (day: string) => {
    await get(API_DAY_CLASS, { Today: day }).then((res) => {
      setTodayClassArr(res.data);
    });
  };

  useEffect(() => {
    getMonClass(choseMonth);
    getTodayClass(moment().format('YYYY-MM-DD'));
  }, [choseMonth, isAdd]);

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
          dateCellRender={(value: Moment) =>
            monClassArr.map(
              (item: classInfo) =>
                value.isSame(moment(item.time, 'YYYY-MM-DD'), 'day') && (
                  <Link
                    className="item"
                    key={item.c_id}
                    to={`/dea?c_id=${item.c_id}&c_name=${item.c_name}`}
                  >
                    <img src={'static/' + item.c_name + '.svg'} alt="课程" />
                    <div className="signupNum">{item.num ? item.num : 0}</div>
                  </Link>
                ),
            )
          }
        />
      </div>
    </div>
  );
};

IndexPage.title = 'Home Page';
export default IndexPage;
