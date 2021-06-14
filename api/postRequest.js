import request from '../lib/axiosConfig';
import Cookie from 'js-cookie';

const token = Cookie.get('token');

export const postNewPost = ({ image, text, location }) => {
  return request.post(
    '/api/posts',
    { image, text, location },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};

export const getAllPosts = () => {
  return request.get(`/api/posts`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const getPost = (id) => {
  return request.get(`/api/posts/${id}`);
};

export const deletePost = (id) => {
  return request.delete(`/api/posts${id}`);
};

export const commentPost = (id, text) => {
  return request.post(
    `/api/posts/comment/${id}`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};
