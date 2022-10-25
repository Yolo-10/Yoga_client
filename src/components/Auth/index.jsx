import React, { useEffect } from 'react';
import { history } from 'umi';
import { getToken } from '@/util/token';

export default function Auth(props) {
  useEffect(() => {
    const token = getToken();
    if (!token) {
      history.push('/login');
    }
  }, []);
  return <div>{props.children}</div>;
}
