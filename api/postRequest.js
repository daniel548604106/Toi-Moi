import request from '../lib/axiosConfig';
import Cookie from 'js-cookie';

const token = Cookie.get('token');

export const postNewPost = ({ image, text, location, type }) => {
  return request.post('/posts', { image, text, location, type });
};

export const getAllPosts = (currentPage) => {
  return request.get(`/posts?page=${currentPage}`);
};

export const getPost = (id) => {
  return request.get(`/posts/${id}`);
};

// Delete
export const deletePost = (id) => {
  return request.delete(`/posts/${id}`);
};

// Comment

export const commentPost = (id, text) => {
  return request.post(`/posts/comment/${id}`, { text });
};

// Like

export const likePost = (id) => {
  return request.post(`/posts/like/${id}`);
};

export const unlikePost = (id) => {
  return request.post(`/posts/unlike/${id}`);
};

// Like a Comment

export const likeComment = (postId, commentId) => {
  return request.post(`/posts/like/${postId}/${commentId}`);
};

// Unlike a Comment
export const unlikeComment = (postId, commentId) => {
  return request.post(`/posts/unlike/${postId}/${commentId}`);
};

// Delete a Comment
export const deleteComment = (postId, commentId) => {
  return request.delete(`/posts/${postId}/${commentId}`);
};
