import { useEffect, useState } from 'react';
import { useHistory, useModel } from 'umi';
import { LeftOutlined } from '@ant-design/icons';
import moment from 'moment';
import {
  API_DEL_SIGN_UP,
  API_CLASS_BY_ID,
  API_SIGN_UP_USERS,
  API_SIGN_UP,
  get,
  post,
} from '@/constant/api';
import { Item } from '@/components';
import './index.less';
import { Alert } from 'antd';

export default function dea(props: any) {
  const history = useHistory();
  const {
    initialState: { userInfo },
  } = useModel('@@initialState');
  const { c_id, c_name } = props.location.query;

  const [users, setUsers] = useState([]);
  const [isSign, setIsSign] = useState(false);
  const [isClassEnd, setIsClassEnd] = useState(true);
  const [realP, setRealP] = useState(0);
  const [item, setItem] = useState({
    c_id: -1,
    c_name: '',
    time: '',
    place: '',
    p_limit: 0,
  });

  //返回上一页面
  const returnBefore = () => {
    history.go(-1);
  };
  //报名退选事件
  const handleSignup = () => {
    //报名/退选课程
    !isSign ? signupClass() : delSignupClass();
  };
  //请求课程头部信息
  const getClassById = async () => {
    get(API_CLASS_BY_ID, { c_id: c_id }).then((res) => {
      setItem(res.data[0]);
    });
  };
  // 初始页面——请求报名列表（判定是否已报名该课程）
  const getSignupUsersInit = () => {
    get(API_SIGN_UP_USERS, { c_id }).then((res) => {
      // 如果返回的报名列表中存在本用户，标记为已经报名
      let thisUserSignup = res.data.find(
        (obj: { u_id: number }) => obj.u_id == userInfo.u_id,
      );
      setIsSign(Boolean(thisUserSignup));
      setUsers(res.data);
    });
  };
  // 请求报名列表（直接获取所有报名列表，渲染）
  const getSignupUsers = () => {
    get(API_SIGN_UP_USERS, { c_id: c_id }).then((res) => {
      setUsers(res.data);
    });
  };
  //报名该课程
  const signupClass = async () => {
    let { c_id } = item,
      { u_id, u_name } = userInfo,
      appo_time = moment().format('YYYY-MM-DD HH:mm:ss');
    post(API_SIGN_UP, { c_id, c_name, u_id, u_name, appo_time }).then((res) => {
      if (res.data.affectedRows > 0) {
        //报名了
        setIsSign(true);
        //重新获取报名列表
        getSignupUsers();
      }
    });
  };
  //退选该课程
  const delSignupClass = async () => {
    let { c_id } = item,
      { u_id } = userInfo;
    post(API_DEL_SIGN_UP, { c_id, u_id }).then((res) => {
      if (res.data.affectedRows > 0) {
        //不报名了
        setIsSign(false);
        //重新获取报名列表
        getSignupUsers();
      }
    });
  };
  //缺席状态改变时，实际人数的变化-->价格变动
  const reduceRealP = (val: number, op: string) => {
    setRealP(op == 'add' ? realP + val : realP - val);
  };

  const isBeforeOneHour = moment().isBefore(
    moment(item.time.substring(0, 16)).add(-1, 'h'),
  );

  useEffect(() => {
    //查询本课程
    getClassById();
    //报名用户是否报名以及报名列表
    getSignupUsersInit();
  }, []);

  //判断课程是否结束---因为请求课程信息太慢，故此处是监听item的变化，而非页面初始化时执行
  useEffect(() => {
    //检测课程是否已经结束
    let classEndTime =
      item.time.substring(0, 10) + ' ' + item.time.substring(17, 22);
    if (moment(classEndTime, moment.ISO_8601).isAfter(moment())) {
      setIsClassEnd(false);
    }
  }, [item]);

  //获取课程实际到场人数
  useEffect(() => {
    setRealP(
      users.reduce((pre, user) => pre - (user?.time ? 1 : 0), users.length),
    );
  }, [users]);

  return (
    <div className="page_dea">
      <div>
        <header>
          <LeftOutlined style={{ fontSize: '24px' }} onClick={returnBefore} />
          <span>课程详情</span>
        </header>

        <Alert
          message={<div>{item.time.substring(5) + '  ' + item.place}</div>}
          icon={
            <div className="item">
              <img src={'/static/' + c_name + '.svg'} alt="课程类别" />
            </div>
          }
          showIcon
        />
        <div className="hd_des">
          <div>报名人数：{users?.length || 0}</div>
          <div>
            人均学费：
            {realP <= 4
              ? 75
              : realP <= 6
              ? 65
              : realP <= 8
              ? 60
              : realP <= 10
              ? 55
              : 50}
          </div>
        </div>

        <div>
          <ul className="list_hd">
            <li>学员</li>
            {!userInfo?.u_type && <li>缺席</li>}
            {!userInfo?.u_type && <li>缺席次数</li>}
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
      </div>

      <div>
        {/*未达开课人数 */}
        {realP < 4 && (
          <span className="m-bt-notice">离最少开课人数差 {4 - realP} 位</span>
        )}

        {/* 管理员、课程未结束 */}
        {!(isClassEnd || userInfo?.u_type == 0) && (
          <span className="m-bt-notice">课前1小时 后无法报名或退选课程</span>
        )}

        {/* 登录且是学员且课程未结束 */}
        {!(userInfo?.u_type == 0 || isClassEnd) && (
          <>
            {item.p_limit <= users.length && !isSign ? (
              <button className="ft_btn disabled" disabled={true}>
                报名人数已满
              </button>
            ) : !isSign ? (
              <button
                className={isBeforeOneHour ? 'ft_btn' : 'ft_btn disabled'}
                onClick={handleSignup}
                //上课前一小时 后不可以报名
                disabled={!isBeforeOneHour}
              >
                报名
              </button>
            ) : (
              <button
                className={isBeforeOneHour ? 'ft_btn dan' : 'ft_btn disabled'}
                onClick={handleSignup}
                //上课前一小时 后不可以退选
                disabled={!isBeforeOneHour}
              >
                退选
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
