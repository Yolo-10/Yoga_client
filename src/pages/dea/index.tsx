import { useEffect, useState } from 'react';
import { history } from 'umi';
import { Alert } from 'antd';
import moment from 'moment';
import { GetClassByIdApi, GetSignupUsersApi } from '@/services/api';
import { Item, Svg } from '@/components';
import yogaImg from '@/static/yoga.svg';
import './index.less';

export default function dea(props: any) {
  const { c_id } = props.location.query;
  const [users, setUsers] = useState([]);
  //初始假设课程未结束
  const [isClassEnd, setIsClassEnd] = useState(false);
  const [item, setItem] = useState({
    c_id: '',
    c_name: '',
    time: '',
    place: '',
    nm_money: '0.00',
    p_limit: 0,
  });

  const returnBefore = () => {
    history.go(-1);
  };

  //请求课程头部信息
  const getClassById = async () => {
    GetClassByIdApi({
      params: {
        c_id: c_id,
      },
    })
      .then((res) => {
        res.status == 1 ? setItem(res.data[0]) : null;
      })
      .catch((err) => console.log(err));
  };
  // 请求报名列表
  const getSignupUsers = async () => {
    GetSignupUsersApi({
      params: {
        c_id: c_id,
      },
    })
      .then((res) => {
        if (res.status == 1) {
          setUsers(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    //检测课程是否已经结束
    let classEndTime =
      item.time.substring(0, 10) + ' ' + item.time.substring(17, 22);
    if (moment(classEndTime, moment.ISO_8601).isBefore(moment())) {
      setIsClassEnd(true);
    }
  }, [item]);

  useEffect(() => {
    getClassById();
    getSignupUsers();
  }, []);

  return (
    <div className="page_dea">
      <header>
        <div onClick={returnBefore}>
          <Svg id={'arr_e_left'} size={24} color={`#262626`} />
        </div>
        <span>课程详情</span>
      </header>
      <Alert
        message={
          <div>
            <span>{item?.time.substring(5)}</span>
            <span>{item?.place}</span>
          </div>
        }
        icon={
          <div className="item">
            <img src={yogaImg} alt="" />
          </div>
        }
        showIcon
      ></Alert>
      <div className="hd_des">
        <div>
          普通金额：
          {(
            Number(item.nm_money) / (users.length > 5 ? users.length : 5)
          ).toFixed(2)}
        </div>
        <div>
          非预约金额：
          {(
            (Number(item.nm_money) / (users.length > 5 ? users.length : 5)) *
            1.5
          ).toFixed(2)}
        </div>
        <div>人数：{item?.p_limit}</div>
      </div>
      <div>
        <ul className="list_hd">
          <li>学员</li>
          <li>时间</li>
          <li>学费</li>
          <li>黑名单</li>
        </ul>
        <div className="list_bd">
          {users?.map((u_item, i) => (
            <Item
              u_item={u_item}
              classDay={item?.time}
              key={i}
              c_id={item?.c_id}
              isClassEnd={isClassEnd}
              nm_money={(
                Number(item.nm_money) / (users.length > 5 ? users.length : 5)
              ).toFixed(2)}
              na_money={(
                (Number(item.nm_money) /
                  (users.length > 5 ? users.length : 5)) *
                1.5
              ).toFixed(2)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
