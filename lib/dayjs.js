import dayjs from 'dayjs';

export const timeDiff = (date) => {
  const now = dayjs();
  if (now.diff(date, 'hour') < 1) {
    return `${now.diff(date, 'minute')} minutes ago`;
  }

  if (now.diff(date, 'hour') < 12) {
    return `${now.diff(date, 'hour')} hours ago`;
  }

  if (now.diff(date, 'hour') < 24) {
    return `${dayjs(date).format('h:mm A')}`;
  }
  if (now.diff(date, 'day') < 7) {
    return `${now.diff(date, 'day')} days`;
  } else {
    return `${now.diff(date, 'week')} weeks`;
  }
};
