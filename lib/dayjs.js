import dayjs from 'dayjs';

export const dateDiff = (date) => {
  const now = dayjs();
  if (now.diff(date, 'hour') < 24) {
    return dayjs(date).format('h:mm A');
  }
  if (now.diff(date, 'day') < 7) {
    return `${now.diff(date, 'day')} 天`;
  } else {
    return `${now.diff(date, 'week')} 週`;
  }
};
