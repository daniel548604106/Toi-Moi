import request from '../lib/axiosConfig';

export const uploadStory = (data) => {
  return request.post('/stories/upload', data, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  });
};
