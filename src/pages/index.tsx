import type { Moment } from 'moment';
import { Calendar } from 'antd';
import AddForm from "../components/AddForm";
import './index.less';

const item = {
  "c_id": 1,
  "c_name": "数据结构",
  "time": "2022-07-03 15:34:23",
  "place": "勤园13-208",
  "nm_money": "188.00",
  "na_money": "200.00",
  "p_limit": 50
}

const IndexPage = () => {
  const clickItem = (id: Number) => {
    console.log(id)
  }

  const dateCellRender = (value: Moment) => {
    return value.format('YYYY-MM-DD') === item.time.split(' ')[0] ? (
      <span className='item' onClick={() => clickItem(item.c_id)}>
        {item.c_id} {item.c_name}
      </span >
    ) : null;
  };


  return (
    <div className='c_width'>
      <AddForm />
      <Calendar dateCellRender={dateCellRender} />
    </div >
  )
}

export default IndexPage;
