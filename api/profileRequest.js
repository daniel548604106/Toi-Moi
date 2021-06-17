import request from '../lib/axiosConfig';

export const getProfile = (username) => {
  return request.get(`/profile/${username}`);
};

export const getProfilePosts = (username) => {
  return request.get(`/profile/posts/${username}`);
};

export const patchProfile = ({
  username,
  bio,
  profileCoverPostId,
  profileCoverDescription,
  profileCoverImage
}) => {
  return request.patch(`/profile/${username}`, {
    bio,
    profileCoverPostId,
    profileCoverDescription,
    profileCoverImage
  });
};
