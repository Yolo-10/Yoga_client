import { signupBtnProps } from '../PropInterfaces';
import './index.less';

export default function SignupBtn({
  p_limit,
  u_len,
  isSignup,
  isBeforeOneHour,
  handleSignup,
}: signupBtnProps) {
  return (
    <>
      {p_limit <= u_len && !isSignup ? (
        <button className="ft_btn disabled" disabled={true}>
          报名人数已满
        </button>
      ) : !isSignup ? (
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
  );
}
