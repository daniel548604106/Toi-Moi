import request from '../lib/axiosConfig';

export const postForgotPassword = (email) => {
  return request.post('/reset', { email });
};
