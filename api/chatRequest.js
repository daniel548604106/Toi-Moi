import request from '../lib/axiosConfig';

export const getChats = () => {
  return request.get('/chats');
};

export const getChat = (id) => {
  return request.get(`/chats/chat/${id}`);
};

export const getChatUserInfo = (senderId) => {
  return request.get(`/chats/userInfo/${senderId}`);
};

export const getSearchedChats = (searchText) => {
  return request.get(`/chats/search/${searchText}`);
};
