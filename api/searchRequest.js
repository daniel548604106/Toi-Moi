import request from '../lib/axiosConfig'


export const searchRequest = (searchText)=>{
  return request.get(`/api/search/${searchText}`)
}