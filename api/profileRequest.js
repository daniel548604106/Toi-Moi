import request from '../lib/axiosConfig';

export const getProfile = (username) => {
  return request.get(`/profile/${username}`);
};

export const getProfilePosts = (username) => {
  return request.get(`/profile/posts/${username}`);
};
