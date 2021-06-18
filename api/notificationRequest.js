import request from '../lib/axiosConfig';

export const getNotifications = () => {
  return request.get(`/notifications`);
};

export const postReadNotifications = () => {
  return request.post(`/notifications`);
};

export const postReadSingleNotification = (notificationId) => {
  return request.post(`/notifications/${notificationId}/read`);
};
