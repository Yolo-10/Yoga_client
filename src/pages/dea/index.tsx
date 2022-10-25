import { useEffect, useState } from 'react';
import { history, useModel } from 'umi';
import { LeftOutlined } from '@ant-design/icons';
import moment from 'moment';
import {
  DelSignupClassApi,
  GetClassByIdApi,
  GetSignupUsersApi,
  SignupClassApi,
} from '@/services/api';
import { List, Svg, Header, SignupBtn } from '@/components';
import './index.less';

export default function dea(props: any) {
  const { c_id, c_name } = props.location.query;
  const {
    initialState: { userInfo },
  } = useModel('@@initialState');

  const [users, setUsers] = useState([]);
  const [signupTime, setSignupTime] = useState('');
  //初始假设课程结束
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
            (obj: { u_id: number }) => obj.u_id == userInfo.u_id,
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

        <Header
          time={item.time.substring(5)}
          place={item.place}
          c_name={c_name}
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

        <List
          u_type={userInfo?.u_type == 0}
          users={users}
          c_id={item.c_id}
          isClassEnd={isClassEnd}
          reduceRealP={reduceRealP}
        />
      </div>

      <div>
        {/*未达开课人数 */}
        {realP < 4 ? (
          <span className="m-bt-notice">离最少开课人数差 {4 - realP} 位</span>
        ) : (
          ''
        )}

        {/* 管理员、课程未结束 */}
        {isClassEnd || userInfo?.u_type == 0 ? null : (
          <span className="m-bt-notice">课前1小时 后无法报名或退选课程</span>
        )}

        {/* 登录且是学员且课程未结束 */}
        {userInfo?.u_type == 0 || isClassEnd ? null : (
          <SignupBtn
            p_limit={item.p_limit}
            u_len={users.length}
            isSignup={signupTime.length > 0}
            isBeforeOneHour={moment().isBefore(
              moment(item.time.substring(0, 16)).add(-1, 'h'),
            )}
            handleSignup={handleSignup}
          />
        )}
      </div>
    </div>
  );
}
