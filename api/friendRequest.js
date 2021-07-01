import request from '../lib/axiosConfig';

export const postFriendRequest = (username) => {
  return request.post(`/profile/friend/${username}`);
};

export const removeFriendRequest = (username) => {
  return request.post(`/profile/unfriend/${username}`);
};

export const rejectFriendRequest = (username) => {
  return request.post(`/profile/reject/${username}`);
};

export const getFriendList = () => {
  return request.get(`/friends`);
};
