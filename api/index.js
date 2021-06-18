import { searchRequest } from './searchRequest';
import { postSignup, postLogin } from './authRequest';
import { getChats, getChat } from './chatRequest';
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
import {
  getNotifications,
  postReadNotifications,
  postReadSingleNotification
} from './notificationRequest';
// Search

export const apiSearchRequest = searchRequest;

// Auth

export const apiPostSignup = postSignup;
export const apiPostLogin = postLogin;

// Chats

export const apiGetChats = getChats;
export const apiGetChat = getChat;

// Posts

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

export const apiGetNotifications = getNotifications;
export const apiPostReadNotifications = postReadNotifications;
export const apiPostReadSingleNotification = postReadSingleNotification;
// Profile
import {
  getProfilePosts,
  getProfile,
  patchProfile,
  patchProfileImage,
  getProfileFriends
} from './profileRequest';

export const apiGetProfilePosts = getProfilePosts;
export const apiGetProfile = getProfile;
export const apiPatchProfile = patchProfile;
export const apiGetProfileFriends = getProfileFriends;
export const apiPatchProfileImage = patchProfileImage;

// Friend

import { postFriendRequest } from './friendRequest';
export const apiPostFriendRequest = postFriendRequest;
