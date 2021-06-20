import request from '../lib/axiosConfig';

export const searchRequest = (searchText) => {
  return request.get(`/search/${searchText}`);
};

export const getRecentSearch = () => {
  return request.get('/search/history/recent');
};

export const getAllSearch = () => {
  return request.get(`/search/history/all`);
};

export const postUserSearch = (username) => {
  return request.post('/search/user', { username });
};
export const postKeywordSearch = (keyword) => {
  return request.post('/search/keyword', { keyword });
};

export const deleteHistory = (historyId) => {
  return request.post('/search/history', { historyId });
};
