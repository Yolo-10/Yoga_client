import React, { useEffect } from 'react';
import { history } from 'umi';
import { getToken } from '@/util/token';

export default function Auth(props) {
  useEffect(() => {
    const token = getToken();
    console.log(token);
    if (!token) {
      // window.location.href = '/login';
    }
  }, []);
  return <div>{props.children}</div>;
}
