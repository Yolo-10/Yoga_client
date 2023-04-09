import React, { useEffect } from 'react';
import { getToken } from '@/util/token';

export default function Auth(props) {
  useEffect(() => {
    const token = getToken();
    if (!token) {
      window.location.href = '/login';
    }
  }, []);
  return <div>{props.children}</div>;
}
