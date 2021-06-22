// Me
import { getMyInfo } from './meRequest';
export const apiGetMyInfo = getMyInfo;
// Search

import {
  searchRequest,
  getRecentSearch,
  getAllSearch,
  postKeywordSearch,
  postUserSearch,
  deleteHistory
} from './searchRequest';

export const apiSearchRequest = searchRequest;
export const apiGetRecentSearch = getRecentSearch;
export const apiGetAllSearch = getAllSearch;
export const apiPostKeywordSearch = postKeywordSearch;
export const apiPostUserSearch = postUserSearch;
export const apiDeleteHistory = deleteHistory;

// Auth
import { postSignup, postLogin } from './authRequest';

export const apiPostSignup = postSignup;
export const apiPostLogin = postLogin;

// Chats
import { getChats, getChat, getChatUserInfo } from './chatRequest';

export const apiGetChats = getChats;
export const apiGetChat = getChat;
export const apiGetChatUserInfo = getChatUserInfo;

// Posts

import {
  postNewPost,
  getPost,
  deletePost,
  getAllPosts,
  commentPost,
  likePost,
  unlikePost,
  likeComment,
  unlikeComment,
  deleteComment
} from './postRequest';

export const apiPostNewPost = postNewPost;
export const apiGetPost = getPost;
export const apiGetAllPosts = getAllPosts;
export const apiDeletePost = deletePost;
export const apiCommentPost = commentPost;
export const apiLikePost = likePost;
export const apiUnlikePost = unlikePost;
export const apiLikeComment = likeComment;
export const apiUnlikeComment = unlikeComment;
export const apiDeleteComment = deleteComment;

// Notifications
import {
  getNotifications,
  postReadNotifications,
  postReadSingleNotification
} from './notificationRequest';
export const apiGetNotifications = getNotifications;
export const apiPostReadNotifications = postReadNotifications;
export const apiPostReadSingleNotification = postReadSingleNotification;
// Profile
import {
  getProfilePosts,
  getProfile,
  patchProfile,
  patchProfileImage,
  getProfileFriends,
  patchProfileSummary,
  postWorkExperienceSummary
} from './profileRequest';

export const apiGetProfilePosts = getProfilePosts;
export const apiGetProfile = getProfile;
export const apiPatchProfile = patchProfile;
export const apiGetProfileFriends = getProfileFriends;
export const apiPatchProfileImage = patchProfileImage;
export const apiPatchProfileSummary = patchProfileSummary;
export const apiPostWorkExperienceSummary = postWorkExperienceSummary;
// Friend

import { postFriendRequest } from './friendRequest';
export const apiPostFriendRequest = postFriendRequest;
