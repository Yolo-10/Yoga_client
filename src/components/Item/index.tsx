import { Switch, Modal } from 'antd';
import { useModel } from 'umi';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { AddDefaultApi } from '@/services/api';
import { Svg } from '@/components';

export default function Item(props: any) {
  const {
    initialState: { userInfo },
  } = useModel('@@initialState');
  const {
    u_item: { u_id, u_name, appo_time, time },
    classDay,
    c_id,
    na_money,
    nm_money,
    isClassEnd,
  } = props;
  const app_t = moment(appo_time).format('MM-DD HH:mm');
  const isAppo = classDay.substring(5, 10) == app_t.substring(0, 5);
  const [blacklist, setblacklist] = useState(false);
  const { confirm } = Modal;

  const showConfirm = () => {
    confirm({
      title: `确认 ${u_name} 未上课?`,
      icon: (
        <span>
          <Svg id={'za_notice'} size={24} color={`#faad14`} />
        </span>
      ),
      onOk() {
        console.log('OK');
        setblacklist(!blacklist);
        AddDefaultApi({
          u_id,
          u_name,
          c_id,
          time: moment().format('YYYY:MM:DD HH:mm:ss'),
        })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  useEffect(() => {
    //如果报名-违规两边联查中违规表中有记录，就是已经加入黑名单的了。
    time ? setblacklist(true) : null;
  }, []);

  return (
    // 当课程未结束且当天预约，绿色；当课程结束且加入黑名单，红色;其他，普通
    <ul
      className={
        isAppo && !isClassEnd
          ? 'list_item green'
          : blacklist && isClassEnd
          ? 'list_item red'
          : 'list_item'
      }
    >
      <li>{u_name}</li>
      <li>{app_t}</li>
      <li>{isAppo ? na_money : nm_money}</li>
      {/* 是否禁用：课程未结束或已加黑名单；选中就加进黑名单 */}
      {userInfo?.u_type == 0 ? (
        <li>
          <Switch
            disabled={blacklist || !isClassEnd}
            checked={blacklist}
            onClick={showConfirm}
          />
        </li>
      ) : null}
    </ul>
  );
}
