import { useEffect, useState } from 'react';
import { history, useModel } from 'umi';
import { Alert } from 'antd';
import moment from 'moment';
import {
  DelSignupClassApi,
  GetClassByIdApi,
  GetSignupUsersApi,
  SignupClassApi,
} from '@/services/api';
import { Item, Svg } from '@/components';
import './index.less';

export default function dea(props: any) {
  const { c_id, c_name } = props.location.query;
  const {
    initialState: { isLogin, userInfo },
  } = useModel('@@initialState');
  const [users, setUsers] = useState([]);
  const [signupTime, setSignupTime] = useState('');
  //初始假设课程未结束
  const [isClassEnd, setIsClassEnd] = useState(true);
  const [realP, setRealP] = useState(0);
  const [item, setItem] = useState({
    c_id: '',
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
    signupTime.length == 0 ? signupClass() : delSignupClass();
  };
  //请求课程头部信息
  const getClassById = async () => {
    GetClassByIdApi({
      params: {
        c_id: c_id,
      },
    })
      .then((res) => {
        res.status == 1 ? setItem(res.data[0]) : null;
      })
      .catch((err) => console.log(err));
  };
  // 初始页面——请求报名列表（判定是否已报名该课程）
  const getSignupUsersInit = () => {
    GetSignupUsersApi({
      params: {
        c_id: c_id,
      },
    })
      .then((res) => {
        if (res.status == 1) {
          // 如果返回的报名列表中存在本用户，标记为已经报名
          let thisUserSignup = res.data.find(
            (obj: { u_id: any }, i: any) => obj.u_id == userInfo.u_id,
          );
          thisUserSignup ? setSignupTime(thisUserSignup.appo_time) : null;
          setUsers(res.data);
        }
      })
      .catch((err) => console.log(err));
  };
  // 请求报名列表（直接获取所有报名列表，渲染）
  const getSignupUsers = () => {
    GetSignupUsersApi({
      params: {
        c_id: c_id,
      },
    })
      .then((res) => {
        if (res.status == 1) {
          setUsers(res.data);
          // console.log(res.data);
        }
      })
      .catch((err) => console.log(err));
  };
  //报名该课程
  const signupClass = async () => {
    let { c_id } = item,
      { u_id, u_name } = userInfo,
      appo_time = moment().format('YYYY-MM-DD HH:mm:ss');
    SignupClassApi({ c_id, c_name, u_id, u_name, appo_time })
      .then((res) => {
        if (res.data.affectedRows > 0) {
          //报名了
          setSignupTime(appo_time);
          //重新获取报名列表
          getSignupUsers();
        }
      })
      .catch((err) => console.log(err));
  };
  //退选该课程
  const delSignupClass = async () => {
    let { c_id } = item,
      { u_id } = userInfo;
    DelSignupClassApi({ c_id, u_id })
      .then((res) => {
        if (res.data.affectedRows > 0) {
          //不报名了
          setSignupTime('');
          //重新获取报名列表
          getSignupUsers();
        }
      })
      .catch((err) => console.log(err));
  };
  //缺席状态改变时，实际人数的变化-->价格变动
  const reduceRealP = (val: number, op: string) => {
    setRealP(op == 'add' ? realP + val : realP - val);
  };

  //检测是否登录
  useEffect(() => {
    if (isLogin) {
      //查询本课程
      getClassById();
      //报名用户是否报名以及报名列表
      getSignupUsersInit();
    } else {
      history.replace('/login');
    }
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
          <div onClick={returnBefore}>
            <Svg id={'arr_e_left'} size={24} color={`#262626`} />
          </div>
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
        ></Alert>
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
            {userInfo?.u_type == 0 ? <li>缺席</li> : null}
            {userInfo?.u_type == 0 ? <li>缺席次数</li> : null}
          </ul>
          <div className="list_bd">
            {users?.map((u_item, i) => (
              <Item
                u_item={u_item}
                classDay={item?.time}
                key={i}
                c_id={item?.c_id}
                isClassEnd={isClassEnd}
                reduceRealP={reduceRealP}
              />
            ))}
          </div>
        </div>
      </div>

      <div>
        {/* 管理员、课程未开始、未达开课人数 */}
        {!isClassEnd && realP < 4 ? (
          <span className="m-bt-notice">离最少开课人数差 {4 - realP} 位</span>
        ) : (
          ''
        )}

        {userInfo?.u_type == 0 ? null : (
          <span className="m-bt-notice">课前1小时 后无法报名或退选课程</span>
        )}

        {/*未登录、管理员、开课前1小时  -------->没有报名按钮 */}
        {!isLogin ||
        userInfo?.u_type == 0 ||
        !moment().isBefore(
          moment(item.time.substring(0, 16)).add(-1, 'h'),
        ) ? null : (
          <>
            {item.p_limit <= // 人数已经报满？
              users.length && signupTime.length == 0 ? (
              <button className="ft_btn disabled" disabled={true}>
                报名人数已满
              </button>
            ) : //学员登录且课程未结束
            signupTime.length == 0 ? (
              <button className="ft_btn" onClick={handleSignup}>
                报名
              </button>
            ) : //上课前一小时可以退选
            moment().isBefore(
                moment(item.time.substring(0, 16)).add(-1, 'h'),
              ) ? (
              <button className="ft_btn dan" onClick={handleSignup}>
                退选
              </button>
            ) : (
              <button className="ft_btn disabled" disabled={true}>
                退选
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
