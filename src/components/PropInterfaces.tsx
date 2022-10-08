import type { Moment } from 'moment';
import { MouseEventHandler } from 'react';

export interface basicClassInfo {
  time: string;
  place: string;
  c_name: string;
}

export interface classInfo extends basicClassInfo {
  c_id: number;
  p_limit: number;
  num?: number;
}

export interface userBlackInfo {
  u_id: number;
  u_name: string;
  time: string;
  times: number;
}

export interface datecellProps {
  value: Moment;
  monClassArr: classInfo[];
}

export interface calSelectProps {
  value: Moment;
  onChange: Function;
}

export interface calSelectProps {
  value: Moment;
  onChange: Function;
}

export interface signupBtnProps {
  p_limit: number;
  u_len: number;
  isSignup: boolean;
  isBeforeOneHour: boolean;
  handleSignup: MouseEventHandler;
}

export interface addFormProps {
  canAdd: boolean;
  choseDay: string;
  setIsAdd: Function;
}

export interface ItemProps {
  u_item: userBlackInfo;
  c_id: number;
  isClassEnd: boolean;
  reduceRealP: Function;
}

export interface ListProps {
  u_type: boolean;
  users: userBlackInfo[];
  c_id: number;
  isClassEnd: boolean;
  reduceRealP: Function;
}

export interface FormComProps {
  onFinish: Function;
  confirmNeed: boolean;
  option: string;
  link: {
    src: string;
    str: string;
  };
}
