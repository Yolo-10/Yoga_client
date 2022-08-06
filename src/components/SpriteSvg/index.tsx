import React from 'react';
import spr from '@/static/sprite_normal.svg';

const Svg = ({ id = '', size = 0, color = '#eee', sprite = spr }) => (
  <svg
    className="m-svg"
    fill={color}
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`}
  >
    <use xlinkHref={`${sprite}#${id}`} />
  </svg>
);

export default Svg;
