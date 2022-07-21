import { Switch } from 'antd';

export default function Item({ u_item, today, i }) {
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <ul className={today === u_item.appo_time.split(' ')[0] ?
      "list_item  today" : "list_item"} key={i}>
      <li>{u_item.u_id}</li>
      <li>{u_item.u_name}</li>
      <li>{u_item.appo_time}</li>
      <li><Switch defaultChecked onChange={onChange} /></li>
    </ul>
  )
}
