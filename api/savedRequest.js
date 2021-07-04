import request from '../lib/axiosConfig';

export const getSavedPosts = () => {
  return request.get('/saved/posts');
};

export const postNewSavedPost = (data) => {
  return request.post('/saved/posts/post', data);
};

export const deleteSavedPost = (postId) => {
  return request.post(`/saved/posts/delete/${postId}`);
};
