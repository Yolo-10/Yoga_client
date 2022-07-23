import { Alert, Divider } from 'antd'
import Item from '../../components/Item'
import yogaImg from '../../img/瑜伽.svg'
import './index.less'

const item = {
  "c_name": "瑜伽",
  "time": "2022-07-16 17:00-18:30",
  "place": "师生活动中心2-108",
  "nm_money": "400",
  "na_money": "40",
  "p_limit": 50
}

const u_list = [{
  "u_name": "张三",
  "appo_time": "2022-07-12 14:00",
  "cost": "40"
}, {
  "u_name": "李四",
  "appo_time": "2022-07-12 15:00",
  "cost": "40"
}, {
  "u_name": "张三",
  "appo_time": "2022-07-13 15:30",
  "cost": "40"
}, {
  "u_name": "王五",
  "appo_time": "2022-07-14 17:00",
  "cost": "40"
}, {
  "u_name": "张章",
  "appo_time": "2022-07-15 18:00",
  "cost": "40"
}, {
  "u_name": "李粒",
  "appo_time": "2022-07-16 12:00",
  "cost": "60"
}, {
  "u_name": "倪浩浩",
  "appo_time": "2022-07-16 14:00",
  "cost": "60"
},]

export default function dea() {

  return (
    <div className='page_dea'>
      <header>
        <div className='ico_arrow'></div>
        <div>课程详情</div>
      </header>
      <Alert message={
        <div>
          <span>{item.time}</span>
          <span>{item.place}</span>
        </div>}
        icon={
          <div className='item'>
            <img src={yogaImg} alt="" />
          </div >}
        showIcon >
      </Alert >

      <div className='hd_des'>
        <div>普通金额：{item.nm_money}</div>
        <div>非预约金额：{item.na_money}</div>
        <div>人数：{item.p_limit}</div>
      </div>

      <div>
        <ul className='list_hd'>
          <li>学员</li>
          <li>时间</li>
          <li>学费</li>
          <li>黑名单</li>
        </ul>
        <div className="list_bd">
          {u_list.map((u_item, i) =>
            <Item u_item={u_item} today={item.time.split(' ')[0]} i={i} key={i} />)}
        </div>
      </div>
    </div >
  )
}
