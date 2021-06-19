import request from '../lib/axiosConfig';

export const getMyInfo = () => {
  return request.get('/me');
};
