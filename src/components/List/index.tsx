import { ListProps } from '../PropInterfaces';
import Item from '../Item';
import './index.less';

export default function List({
  u_type,
  users,
  c_id,
  isClassEnd,
  reduceRealP,
}: ListProps) {
  return (
    <div>
      <ul className="list_hd">
        <li>学员</li>
        {u_type && <li>缺席</li>}
        {u_type && <li>缺席次数</li>}
      </ul>
      <div className="list_bd">
        {users?.map((u_item, i) => (
          <Item
            u_item={u_item}
            key={i}
            c_id={c_id}
            isClassEnd={isClassEnd}
            reduceRealP={reduceRealP}
          />
        ))}
      </div>
    </div>
  );
}
