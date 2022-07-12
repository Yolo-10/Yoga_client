import type { Moment } from 'moment';
import { Calendar } from 'antd';
import AddForm from "../components/AddForm";
import './index.less';
const data = require('../data.json');
const item = data[0];

const clickItem = (id: Number) => {
  console.log(id)
}

const IndexPage = () => {
  const dateCellRender = (value: Moment) => {
    return value.format('YYYY-MM-DD') === data[0].time.split(' ')[0] ? (
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
