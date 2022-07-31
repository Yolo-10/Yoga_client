import type { Moment } from 'moment';
import moment from 'moment';
import { Calendar, Alert } from 'antd';
import { Link } from 'umi';
import AddForm from "../../components/AddForm";
import yogaImg from '../../img/瑜伽.svg'
import './index.less'
import { useEffect, useState } from 'react';
import { GetMonClassApi, GetTodayClassApi } from '@/services/api';

const item = {
  "c_id": 1,
  "c_name": "瑜伽",
  "time": "2022-07-16 17:00-18:30",
  "place": "师生活动中心2-108",
  "nm_money": "400",
  "na_money": "60",
  "p_limit": 50
}


const IndexPage = () => {
  let [canAdd, setCanAdd] = useState(true);
  let [choseDay, setChoseDay] = useState(moment().format('YYYY-MM-DD'));
  let [choseMonth, setChoseMonth] = useState(moment().format('YYYY-MM'));
  let [isAdd, setIsAdd] = useState(false);
  let [monClassArr, setMonClassArr] = useState([]);
  let [todayClassArr, setTodayClassArr] = useState([]);

  const DateCellRender = (value: Moment) => {
    return (
      monClassArr.map((item: any) => {
        return value.isSame(moment(item.time, 'YYYY-MM-DD'), 'day') ?
          (<Link className='item' to={{
            "pathname": "/dea",
            "params": {
              item,
            },
          }} key={item.c_id}
          >
            {item.c_name === 'yoga' ? <img src={yogaImg} alt="" /> : ""}
          </Link >)
          : null;
      })
    )
  };


  //选择日期发生变化的回调
  const calChange = (value: Moment) => {
    //设置添加按钮的开启
    if (value.isSame(moment(), "day")) {
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
    GetMonClassApi({ params: { Mon: choseMonth } }).then(res => {
      if (res.status === 1) {
        setMonClassArr(res.data);
      }
    }).catch(err =>
      console.log(err)
    )
  }, [choseMonth, isAdd]);

  //头部信息
  useEffect(() => {
    GetTodayClassApi({ params: { Today: choseDay } }).then(res => {
      if (res.status === 1) {
        setTodayClassArr(res.data);
      }
    }).catch(err =>
      console.log(err)
    )
  }, [isAdd]);


  return (
    <div className="page_init">
      {todayClassArr.map((item: any) => {
        return (<Alert key={item.c_id}
          message={<div>
            <span>{item.time.substring(5)}</span>
            <span>{item.place}</span>
          </div>}
          icon={<div className='item'>
            <img src={yogaImg} alt="" />
          </div >} showIcon >
        </Alert >)
      })}


      <div className="m_body">
        <AddForm canAdd={canAdd} choseDay={choseDay} setIsAdd={setIsAdd} />
        <Calendar dateCellRender={DateCellRender}
          onChange={calChange} onPanelChange={onPanelChange} />
      </div>
    </div >
  )
}

export default IndexPage;
