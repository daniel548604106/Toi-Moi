import request from '../lib/axiosConfig';

export const getChats = () => {
  return request.get('/chats');
};

export const getChat = (id) => {
  return request.get(`/chats/${id}`);
};
