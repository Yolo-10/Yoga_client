import React from 'react'
import { useState } from 'react';

export default function Item({ u_item, today, i }) {
  const [add, setAdd] = useState(false);
  const handleAddClick = () => {
    alert('确认删除吗')
    setAdd(!add);
  }
  return (
    <ul className={today === u_item.appo_time.split(' ')[0] ?
      "list_item  today" : "list_item"} key={i}>
      <li>{i + 1}</li>
      <li>{u_item.u_id}</li>
      <li>{u_item.u_name}</li>
      <li>{u_item.appo_time}</li>
      <li><button onClick={handleAddClick} className={add ? "active" : ""}>{add ? "已加入" : "加入"}</button></li>
    </ul>
  )
}
