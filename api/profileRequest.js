import request from '../lib/axiosConfig';

export const getProfile = (username) => {
  return request.get(`/profile/${username}`);
};

export const getProfilePosts = (username, currentPage) => {
  return request.get(`/profile/posts/${username}?page=${currentPage}`);
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

export const patchProfileBio = ({ username, bio }) => {
  return request.patch(`/profile/${username}`, { bio });
};

export const patchProfileSummary = (username) => {
  return request.patch(`/profile/${username}/summary`);
};

// Add Work Experience
export const postWorkExperienceSummary = (username, experience) => {
  return request.post(`/profile/${username}/work_experience`, { experience });
};

// Add Education
export const postEducationSummary = (username, experience) => {
  return request.post(`/profile/${username}/education`, { experience });
};

export const getProfileFriends = (username) => {
  return request.get(`/profile/friends_preview/${username}`);
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

// Get Profile Summary
export const getProfileSummary = (username) => {
  return request.get(`/profile/summary/${username}`);
};
