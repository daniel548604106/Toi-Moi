import request from '../lib/axiosConfig';

export const postNewRoom = (data) => {
  return request.post(`/rooms`, data);
};
