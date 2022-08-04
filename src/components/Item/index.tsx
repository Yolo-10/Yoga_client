import { Switch, Popconfirm, message } from 'antd';
import { useEffect, useState } from 'react';
import moment from "moment";
import { AddDefaultApi } from '@/services/api';

export default function Item(props: any) {
  const { u_item: { u_id, u_name, appo_time, time }, classDay, c_id, na_money, nm_money } = props;
  const app_t = moment(appo_time).format('MM-DD HH:mm');
  const isAppo = (classDay.substring(5, 10) == app_t.substring(0, 5));
  //初始假设课程未结束
  const [isClassEnd, setIsClassEnd] = useState(false);
  const [blacklist, setblacklist] = useState(false);

  const confirm = (e: React.MouseEvent<HTMLElement>) => {
    setblacklist(!blacklist);
    AddDefaultApi({ u_id, u_name, c_id, time: moment().format('YYYY:MM:DD HH:mm:ss') }).then(res => {
      console.log(res)
    }).catch(err =>
      console.log(err)
    )
  };


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
    <ul className={isAppo && !isClassEnd ?
      "list_item green" : (blacklist && isClassEnd ? "list_item red" : "list_item")} >
      <li>{u_name}</li>
      <li>{app_t}</li>
      <li>{isAppo ? na_money : nm_money}</li>
      {/* 是否禁用：课程未结束或已加黑名单；选中就加进黑名单 */}
      <li><Popconfirm
        title={`确定将 ${u_name} 加入黑名单`}
        onConfirm={confirm}
        okText="确认"
        cancelText="取消">
        <Switch disabled={blacklist || !isClassEnd} checked={blacklist} />
      </Popconfirm></li>
    </ul >
  )
}
