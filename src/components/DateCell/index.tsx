import { Link } from 'umi';
import moment from 'moment';
import { datecellProps, classInfo } from '../PropInterfaces';

export default function DateCellRender({ value, monClassArr }: datecellProps) {
  return (
    <>
      {monClassArr.map((item: classInfo) => {
        return value.isSame(moment(item.time, 'YYYY-MM-DD'), 'day') ? (
          <Link
            className="item"
            key={item.c_id}
            to={`/dea?c_id=${item.c_id}&c_name=${item.c_name}`}
          >
            {item.c_name ? (
              <img src={'static/' + item.c_name + '.svg'} alt="课程" />
            ) : (
              ''
            )}
            <div className="signupNum">{item.num ? item.num : 0}</div>
          </Link>
        ) : null;
      })}
    </>
  );
}
