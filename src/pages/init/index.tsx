import type { Moment } from 'moment';
import { Calendar, Alert } from 'antd';
import { Link } from 'umi';
import AddForm from "../../components/AddForm";
import yogaImg from '../../img/瑜伽.svg'
import './index.less'

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
  const dateCellRender = (value: Moment) => {
    return value.format('YYYY-MM-DD') === item.time.split(' ')[0] ? (
      <Link className='item' to={`/dea?c_id=${item.c_id}`}>
        {item.c_name === '瑜伽' ? <img src={yogaImg} alt="" /> : ""}
      </Link>
    ) : null;
  };

  return (
    <div className="page_init">
      <Alert message={<div><span>{item.time.substring(5)}</span><span>{item.place}</span></div>}
        icon={<div className='item'>
          <img src={yogaImg} alt="" />
        </div >} showIcon >
      </Alert >

      <div className="m_body">
        <AddForm />
        <Calendar dateCellRender={dateCellRender} />
      </div>
    </div >
  )
}

export default IndexPage;
