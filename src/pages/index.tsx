import type { Moment } from 'moment';
import { Calendar, Alert } from 'antd';
import { Link } from 'umi';
import AddForm from "../components/AddForm";
import yogaImg from '../img/瑜伽.svg'

const item = {
  "c_id": 1,
  "c_name": "瑜伽",
  "time": "2022-07-16 15:00:00-17:00:00",
  "place": "勤园21-204",
  "nm_money": "188.00",
  "na_money": "200.00",
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
    <div className="page_main">
      <Alert message={`${item.time}，${item.place}`}
        icon={<div className='item' >
          <img src={yogaImg} alt="" />
        </div>} showIcon>
      </Alert>

      <div className="m_body">
        <AddForm />
        <Calendar dateCellRender={dateCellRender} />
      </div>
    </div >
  )
}

export default IndexPage;
