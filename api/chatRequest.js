import request from '../lib/axiosConfig'

export const getChats = () =>{
  return request.get('/api/chats')
}

export const getChat = (id) =>{
  return request.get(`/api/chats/${id}`)
}