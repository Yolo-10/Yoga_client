import { Switch } from 'antd';
import { useEffect, useState } from 'react';
import moment from "moment";
import { AddDefaultApi } from '@/services/api';

export default function Item(props: any) {
  const { u_item: { u_id, u_name, cost, appo_time, time }, classDay, c_id } = props;
  const app_t = moment(appo_time).format('MM-DD HH:mm');
  //初始假设课程未结束
  const [isClassEnd, setIsClassEnd] = useState(false);
  const [blacklist, setblacklist] = useState(false);

  useEffect(() => {
    time ? setblacklist(true) : null;
    let classEndTime = classDay.substring(0, 10) + " " + classDay.substring(17, 22);
    if (moment(classEndTime).isBefore(moment())) {
      setIsClassEnd(true);
    }
  }, []);

  const onChange = (checked: boolean) => {
    setblacklist(checked);
    AddDefaultApi({ u_id, u_name, c_id, time: moment().format('YYYY:MM:DD HH:mm:ss') }).then(res => {
      console.log(res)
    }).catch(err =>
      console.log(err)
    )
  };


  return (
    // 当课程未结束且当天预约，绿色；当课程结束且加入黑名单，红色;其他，普通
    <ul className={classDay.substring(5, 10) == app_t.substring(0, 5) && !isClassEnd ?
      "list_item green" : (blacklist && isClassEnd ? "list_item red" : "list_item")} >
      <li>{u_name}</li>
      <li>{app_t}</li>
      <li>{cost}</li>
      {/* 是否禁用：课程未结束或已加黑名单；选中就加进黑名单 */}
      <li><Switch disabled={blacklist || !isClassEnd} checked={blacklist} onChange={onChange} /></li>
    </ul >
  )
}
