import { Alert } from 'antd'
import Item from '../../components/Item'
import yogaImg from '../../img/瑜伽.svg'
import './index.less'

const item = {
  "c_id": 1,
  "c_name": "瑜伽",
  "time": "2022-07-16 15:00:00-17:00:00 ",
  "place": "勤园21-204",
  "nm_money": "188.00",
  "na_money": "200.00",
  "p_limit": 50
}

const u_list = [{
  "u_id": "201732190",
  "u_name": "张三",
  "appo_time": "2022-07-12 14:00",
  "cost": "188.00"
}, {
  "u_id": "201433190",
  "u_name": "李四",
  "appo_time": "2022-07-12 15:00",
  "cost": "188.00"
}, {
  "u_id": "201332190",
  "u_name": "张三",
  "appo_time": "2022-07-13 15:30",
  "cost": "188.00"
}, {
  "u_id": "201742190",
  "u_name": "王五",
  "appo_time": "2022-07-14 17:00",
  "cost": "188.00"
}, {
  "u_id": "201732390",
  "u_name": "张章",
  "appo_time": "2022-07-15 18:00",
  "cost": "188.00"
}, {
  "u_id": "201732190",
  "u_name": "李粒",
  "appo_time": "2022-07-16 12:00",
  "cost": "200.00"
}, {
  "u_id": "201732190",
  "u_name": "倪浩浩",
  "appo_time": "2022-07-16 14:00",
  "cost": "200.00"
},]

export default function dea() {

  return (
    <div className='page_dea'>
      <Alert message={
        <div>
          <span>{item.time.substring(5)}</span>
          <span>{item.place}</span>
        </div>}
        icon={
          <div className='item'>
            <img src={yogaImg} alt="" />
          </div >}
        showIcon >
      </Alert >

      <div className="m_list">
        <div>报名列表</div>
        <ul className='list_hd'>
          <li>用户名</li>
          <li>报名时间</li>
          <li>缴费金额</li>
          <li>黑名单</li>
        </ul>
        <div className="list_bd">
          {u_list.map((u_item, i) =>
            <Item u_item={u_item} today={item.time.split(' ')[0]} i={i} />)}
        </div>
      </div >
      <div className="m_list">
        <div>报名列表</div>
        <ul className='list_hd'>
          <li>用户名</li>
          <li>报名时间</li>
          <li>缴费金额</li>
          <li>黑名单</li>
        </ul>
        <div className="list_bd">
          {u_list.map((u_item, i) =>
            <ul className={item.time.split(' ')[0] === u_item.appo_time.split(' ')[0] ?
              "list_item  today" : "list_item"} key={i}>
              <li>{u_item.u_id}</li>
              <li>{u_item.u_name}</li>
              <li>{u_item.appo_time}</li>
              <li>{u_item.cost}</li>
            </ul>
          )}
        </div>
      </div>
      <div className="m_list">
        <div>违约名单</div>
        <ul className='list_hd'>
          <li>用户工号</li>
          <li>用户名</li>
        </ul>
        <div className="list_bd">
          {u_list.map((u_item, i) =>
            <ul className={item.time.split(' ')[0] === u_item.appo_time.split(' ')[0] ?
              "list_item  today" : "list_item"} key={i}>
              <li>{u_item.u_id}</li>
              <li>{u_item.u_name}</li>
            </ul>
          )}
        </div>
      </div>
    </div >
  )
}
