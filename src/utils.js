import moment from 'moment';

export const getTime = ts => {
  return moment(ts).format('YYYY-MM-DD HH:mm:ss');
};

export const getTimestamp = obj => {
  return moment(obj.format()).valueOf()
};
