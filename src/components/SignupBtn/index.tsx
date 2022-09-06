import moment from 'moment';
import { signupBtnProps } from '../PropInterfaces';
import './index.less';

export default function SignupBtn({
  p_limit,
  u_len,
  isSignup,
  classTime,
  handleSignup,
}: signupBtnProps) {
  return (
    <>
      {p_limit < u_len && !isSignup ? (
        <button className="ft_btn disabled" disabled={true}>
          报名人数已满
        </button>
      ) : !isSignup ? (
        <button className="ft_btn" onClick={handleSignup}>
          报名
        </button>
      ) : //上课前一小时可以退选
      moment().isBefore(moment(classTime.substring(0, 16)).add(-1, 'h')) ? (
        <button className="ft_btn dan" onClick={handleSignup}>
          退选
        </button>
      ) : (
        <button className="ft_btn disabled" disabled={true}>
          退选
        </button>
      )}
    </>
  );
}
