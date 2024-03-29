import { Switch, Modal } from 'antd';
import { useModel } from 'umi';
import { useEffect, useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import { API_ADD_DEFAULT, API_DEL_DEF, post } from '@/constant/api';
import './index.less';

export interface userBlackInfo {
  u_id: number;
  u_name: string;
  time: string;
  times: number;
}

export interface ItemProps {
  u_item: userBlackInfo;
  c_id: number;
  isClassEnd: boolean;
  reduceRealP: Function;
}

export default function Item(props: ItemProps) {
  const {
    initialState: { userInfo },
  } = useModel('@@initialState');
  const {
    u_item: { u_id, u_name, time, times },
    c_id,
    isClassEnd,
    reduceRealP,
  } = props;
  const [blacklist, setBlacklist] = useState(false);
  const [cnt, setCnt] = useState(0);
  const { confirm } = Modal;

  const showConfirm = () => {
    confirm({
      title: `确认 ${u_name} 缺席?`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        post(API_ADD_DEFAULT, {
          u_id,
          u_name,
          c_id,
          time: moment().format('YYYY:MM:DD HH:mm:ss'),
        }).then((res) => {
          setBlacklist(!blacklist);
          //页面缺席次数展示 增加+1
          setCnt(cnt + 1);
          reduceRealP(1, 'reduce');
        });
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  };

  //不缺席了
  const delDef = () => {
    post(API_DEL_DEF, { c_id, u_id }).then((res) => {
      if (res.data.affectedRows > 0) {
        setBlacklist(!blacklist);
        setCnt(cnt - 1);
        reduceRealP(1, 'add');
      }
    });
  };

  useEffect(() => {
    //如果报名-违规两边联查中违规表中有记录，就是已经加入黑名单的了。
    if (time) setBlacklist(true);
    setCnt(times);
  }, []);

  return (
    // 当课程未结束且当天预约，绿色 -------- 去除
    // 当课程结束且加入黑名单，红色; 其他，普通
    <ul className={blacklist && isClassEnd ? 'list_item red' : 'list_item'}>
      <li>{u_name}</li>
      {/* 是否禁用：课程未结束或已加黑名单；选中就加进黑名单 */}
      {userInfo?.u_type == 0 && (
        <li>
          <Switch
            disabled={!isClassEnd}
            checked={blacklist}
            onClick={blacklist ? delDef : showConfirm}
          />
        </li>
      )}
      {userInfo?.u_type == 0 && <li>{cnt}</li>}
    </ul>
  );
}
