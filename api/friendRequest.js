import request from '../lib/axiosConfig';

export const postFriendRequest = (username) => {
  return request.post(`/profile/friend/${username}`);
};
