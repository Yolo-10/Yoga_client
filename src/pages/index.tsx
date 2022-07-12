import type { Moment } from 'moment';
import { Calendar } from 'antd';
import AddForm from "../components/AddForm";
import CPopover from "../components/CPopover";
import './index.less';

const item = {
  "c_id": 1,
  "c_name": "数据结构",
  "time": "2022-07-03 15:00:00",
  "place": "勤园13-208",
  "nm_money": "188.00",
  "na_money": "200.00",
  "p_limit": 50
}

const IndexPage = () => {
  const dateCellRender = (value: Moment) => {
    return value.format('YYYY-MM-DD') === item.time.split(' ')[0] ? (
      <div>
        <CPopover item={item} />
        <CPopover item={item} />
      </div>
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
