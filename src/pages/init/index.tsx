import { useEffect, useState } from 'react';
import { Calendar, Alert, message } from 'antd';
import { Link, useHistory } from 'umi';
import type { Moment } from 'moment';
import moment from 'moment';
import { GetMonClassApi, GetTodayClassApi } from '@/services/api';
import { AddForm, Svg } from '@/components';
import yogaImg from '@/static/yoga.svg';
import './index.less';

const IndexPage = () => {
  const [canAdd, setCanAdd] = useState(true);
  const [choseDay, setChoseDay] = useState(moment().format('YYYY-MM-DD'));
  const [choseMonth, setChoseMonth] = useState(moment().format('YYYY-MM'));
  const [isAdd, setIsAdd] = useState(false);
  const [monClassArr, setMonClassArr] = useState([]);
  const [todayClassArr, setTodayClassArr] = useState([]);
  const history = useHistory();

  const DateCellRender = (value: Moment) => {
    return monClassArr.map((item: any) => {
      return value.isSame(moment(item.time, 'YYYY-MM-DD'), 'day') ? (
        <Link className="item" to={`/dea?c_id=${item.c_id}`} key={item.c_id}>
          {item.c_name === 'yoga' ? <img src={yogaImg} alt="" /> : ''}
        </Link>
      ) : null;
    });
  };

  //登录、退出
  const userLogin = () => {
    let token = localStorage.getItem('token');
    if (token) {
      //退出账号
      localStorage.removeItem('token');
      window.location.href = '/';
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

  //日历课程动态监听
  useEffect(() => {
    GetMonClassApi({ params: { Mon: choseMonth } })
      .then((res) => {
        if (res.status === 1) {
          setMonClassArr(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [choseMonth, isAdd]);

  //头部信息
  useEffect(() => {
    GetTodayClassApi({ params: { Today: choseDay } })
      .then((res) => {
        if (res.status === 1) {
          setTodayClassArr(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [isAdd]);

  return (
    <div className="page_init">
      {todayClassArr.map((item: any) => {
        return (
          <Alert
            key={item.c_id}
            message={
              <div>
                <span>{item.time.substring(5)}</span>
                <span>{item.place}</span>
              </div>
            }
            icon={
              <div className="item">
                <img src={yogaImg} alt="" />
              </div>
            }
            showIcon
          ></Alert>
        );
      })}

      <div className="m_body">
        <div className="icon_box" onClick={userLogin}>
          <Svg id={'usr'} size={24} color={`#262626`} />
        </div>
        <AddForm canAdd={canAdd} choseDay={choseDay} setIsAdd={setIsAdd} />
        <Calendar
          dateCellRender={DateCellRender}
          onChange={calChange}
          onPanelChange={onPanelChange}
        />
      </div>
    </div>
  );
};

export default IndexPage;
