import axios from 'axios';
import Cookie from 'js-cookie';

const token = Cookie.get('token');

const request = axios.create({
  headers: {
    Authorization: `Bearer ${token}`
  },
  baseURL:
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : ''
});

export default request;
