// Reset
import { postForgotPassword, postPasswordReset } from './resetRequest';
export const apiPostForgotPassword = postForgotPassword;

export const apiPostPasswordReset = postPasswordReset;

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
import {
  getChats,
  getChat,
  getChatUserInfo,
  getSearchedChats
} from './chatRequest';

export const apiGetChats = getChats;
export const apiGetChat = getChat;
export const apiGetChatUserInfo = getChatUserInfo;
export const apiGetSearchedChats = getSearchedChats;
// Posts

import {
  postNewPost,
  updatePost,
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
export const apiUpdatePost = updatePost;
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
  patchProfileBio,
  getProfileFriends,
  patchProfileSummary,
  postWorkExperienceSummary,
  postEducationSummary,
  getProfileSummary
} from './profileRequest';

export const apiGetProfilePosts = getProfilePosts;
export const apiGetProfile = getProfile;
export const apiGetProfileSummary = getProfileSummary;
export const apiGetProfileFriends = getProfileFriends;
export const apiPatchProfile = patchProfile;
export const apiPatchProfileImage = patchProfileImage;
export const apiPatchProfileBio = patchProfileBio;
export const apiPatchProfileSummary = patchProfileSummary;
export const apiPostWorkExperienceSummary = postWorkExperienceSummary;
export const apiPostEducationSummary = postEducationSummary;
// Friend

import {
  postFriendRequest,
  removeFriendRequest,
  getFriendList,
  rejectFriendRequest
} from './friendRequest';
export const apiPostFriendRequest = postFriendRequest;
export const apiRemoveFriendRequest = removeFriendRequest;
export const apiGetFriendList = getFriendList;
export const apiRejectFriendRequest = rejectFriendRequest;
// Room
import { postNewRoom } from './roomRequest';
export const apiPostNewRoom = postNewRoom;

// Story
import { uploadStory, uploadStoryImage, getStories } from './storyRequest';
export const apiUploadStory = uploadStory;
export const apiUploadStoryImage = uploadStoryImage;
export const apiGetStories = getStories;

// Saved

import {
  postNewSavedPost,
  getSavedPosts,
  deleteSavedPost
} from './savedRequest';
export const apiPostNewSavedPost = postNewSavedPost;
export const apiGetSavedPosts = getSavedPosts;
export const apiDeleteSavedPost = deleteSavedPost;
