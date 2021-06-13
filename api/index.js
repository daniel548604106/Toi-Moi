import { searchRequest } from './searchRequest'
import { postSignup, postLogin} from './authRequest'
import { getChats, getChat} from './chatRequest'
// Search

export const apiSearchRequest = searchRequest

// Auth

export const apiPostSignup = postSignup
export const apiPostLogin = postLogin


// Message

export const apiGetChats = getChats
export const apiGetChat = getChat