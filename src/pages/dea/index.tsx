import { Alert } from 'antd'
import { LeftOutlined } from '@ant-design/icons';
import Item from '../../components/Item'
import yogaImg from '../../img/瑜伽.svg'
import './index.less'
import { history } from 'umi';
import { useEffect, useState } from 'react';
import { GetClassById, GetSignupUsersApi } from '@/services/api';

export default function dea(props: any) {
  const { c_id } = props.location.query;
  const [Users, setUsers] = useState([]);
  const [item, setItem] = useState({
    "c_id": "",
    "c_name": "",
    "time": "",
    "place": "",
    "nm_money": "0.00",
    "na_money": "0.00",
    "p_limit": 0,
  });

  const returnBefore = () => {
    history.go(-1);
  }

  useEffect(() => {
    //头部信息
    GetClassById({
      params: {
        "c_id": c_id,
      }
    }).then(res => {
      res.status == 1 ? setItem(res.data[0]) : null;
    }).catch(err =>
      console.log(err)
    )

    //报名列表
    GetSignupUsersApi({
      params: {
        "c_id": c_id,
      }
    }).then(res => {
      res.status == 1 ? setUsers(res.data) : null;
    }).catch(err =>
      console.log(err)
    )
  }, [])
  return (
    <div className='page_dea'>
      <header>
        <LeftOutlined onClick={returnBefore} />
        <span>课程详情</span>
      </header>
      <Alert message={
        <div>
          <span>{item?.time.substring(5,)}</span>
          <span>{item?.place}</span>
        </div>}
        icon={
          <div className='item'>
            <img src={yogaImg} alt="" />
          </div >}
        showIcon >
      </Alert >

      <div className='hd_des'>
        <div>普通金额：{(Number(item.nm_money) / item.p_limit).toFixed(2)}</div>
        <div>非预约金额：{item?.na_money}</div>
        <div>人数：{item?.p_limit}</div>
      </div>
      <div>
        <ul className='list_hd'>
          <li>学员</li>
          <li>时间</li>
          <li>学费</li>
          <li>黑名单</li>
        </ul>
        <div className="list_bd">
          {Users?.map((u_item, i) =>
            <Item u_item={u_item} today={item?.time} key={i} c_id={item?.c_id} />)}
        </div>
      </div>
    </div >
  )
}
