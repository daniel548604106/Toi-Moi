import request from '../lib/axiosConfig';

export const postLogin = (data) => {
  return request.post(`/login`, data);
};

export const postSignup = (data) => {
  return request.post(`/signup`, data);
};
