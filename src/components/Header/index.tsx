import { Alert } from 'antd';
import { basicClassInfo } from '../PropInterfaces';
import './index.less';

export default function Header({ time, place, c_name }: basicClassInfo) {
  return (
    <Alert
      message={<div>{time + '  ' + place}</div>}
      icon={
        <div className="item">
          <img src={'/static/' + c_name + '.svg'} alt="课程类别" />
        </div>
      }
      showIcon
    />
  );
}
