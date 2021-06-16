import request from '../lib/axiosConfig';

export const getNotifications = () => {
  return request.get(`/notifications`);
};
