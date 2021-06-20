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

export const getProfileFriends = (username) => {
  return request.get(`/friends_preview/${username}`);
};

// update profile image
export const patchProfileImage = ({
  username,
  profileImageDescription,
  profileImagePostId,
  profileImage
}) => {
  return request.patch(`/profile/${username}/profile_image`, {
    profileImageDescription,
    profileImagePostId,
    profileImage
  });
};
