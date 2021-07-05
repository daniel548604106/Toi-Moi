import dayjs from 'dayjs';

export const timeDiff = (date) => {
  const now = dayjs();
  if (now.diff(date, 'minute') < 1) {
    return `justNow`;
  }
  if (now.diff(date, 'hour') < 1) {
    return `${now.diff(date, 'minute')} minutes ago`;
  }

  if (now.diff(date, 'hour') < 12) {
    return `${now.diff(date, 'hour')} hours ago`;
  }

  if (now.diff(date, 'hour') < 24) {
    return `${dayjs(date).format('h:mm A')} hours ago`;
  }
  if (now.diff(date, 'day') === 1) {
    return `${now.diff(date, 'day')} day`;
  }
  if (now.diff(date, 'day') < 7) {
    return `${now.diff(date, 'day')} days`;
  }

  if (now.diff(date, 'week') < 4) {
    return `${now.diff(date, 'week')} weeks`;
  }

  if (now.diff(date, 'month') === 1) {
    return `${now.diff(date, 'month')} month`;
  }
  if (now.diff(date, 'month') > 1) {
    return `${now.diff(date, 'month')} months`;
  }
};
