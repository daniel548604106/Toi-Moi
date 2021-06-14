import { searchRequest } from './searchRequest';
import { postSignup, postLogin } from './authRequest';
import { getChats, getChat } from './chatRequest';
import { postNewPost, getPost, deletePost, getAllPosts } from './postRequest';
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
