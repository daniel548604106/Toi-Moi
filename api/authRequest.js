import request from '../lib/axiosConfig'

export const postLogin = (data) =>{
  return request.post(`/api/login`,data)
}

export const postSignup = data =>{
  return request.post(`/api/signup`,data)
}