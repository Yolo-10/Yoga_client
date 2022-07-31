import { Switch } from 'antd';
import { useState } from 'react';
import moment from "moment";
import { AddDefaultApi } from '@/services/api';

export default function Item(props: any) {
  const { u_item: { u_id, u_name, cost, appo_time }, today, c_id } = props;
  const app_t = moment(appo_time).format('MM-DD HH:mm');

  const [blacklist, setblacklist] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const onChange = (checked: boolean) => {
    setblacklist(checked);
    AddDefaultApi({ u_id, u_name, c_id, time: moment().format('YYYY:MM:DD HH:mm:ss') }).then(res => {
      console.log(res)
    }).catch(err =>
      console.log(err)
    )
    setDisabled(!disabled);
  };

  return (
    <ul className={today.substring(5, 10) == appo_time.substring(0, 5) ?
      "list_item green" : (blacklist ? "list_item red" : "list_item")} >
      <li>{u_name}</li>
      <li>{app_t}</li>
      <li>{cost}</li>
      <li><Switch defaultChecked={false} disabled={disabled} onChange={onChange} /></li>
    </ul>
  )
}
