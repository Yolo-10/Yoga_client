import { Switch } from 'antd';
import { useState } from 'react';
import moment from "moment";

export default function Item(props: any) {
  const { u_item, today } = props;
  const appo_time = moment(u_item.appo_time).format('MM-DD HH:mm');
  console.log('appo', appo_time);

  const [blacklist, setblacklist] = useState(false);

  const onChange = (checked: boolean) => {
    setblacklist(checked);
  };

  return (
    <ul className={today.substring(5, 10) == appo_time.substring(0, 5) ?
      "list_item green" : (blacklist ? "list_item red" : "list_item")} >
      <li>{u_item.u_name}</li>
      <li>{appo_time}</li>
      <li>{u_item.cost}</li>
      <li><Switch defaultChecked={false} onChange={onChange} /></li>
    </ul>
  )
}
