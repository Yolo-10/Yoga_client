import React from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useState } from 'react';
const { confirm } = Modal;

export default function Item({ u_item, today, i }) {
  const [add, setAdd] = useState(false);

  const showConfirm = () => {
    if (add) {
      return;
    }
    confirm({
      title: `确定将 ${u_item.u_name} 加入黑名单?`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        console.log('OK');
        setAdd(!add);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return (
    <ul className={today === u_item.appo_time.split(' ')[0] ?
      "list_item  today" : "list_item"} key={i}>
      <li>{u_item.u_id}</li>
      <li>{u_item.u_name}</li>
      <li>{u_item.appo_time}</li>
      <li><Button onClick={showConfirm} className={add ? "active" : ""}>{add ? "已加入" : "加入"}</Button></li>
    </ul>
  )
}
