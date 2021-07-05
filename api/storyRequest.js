import request from '../lib/axiosConfig';

export const uploadStory = (data) => {
  return request.post('/stories/upload', data, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  });
};

export const getStories = () => {
  return request.get('/stories');
};
export const uploadStoryImage = (data) => {
  return request.post('/stories/upload/image', data);
};
