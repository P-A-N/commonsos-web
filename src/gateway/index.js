import axios from 'axios';
import userService from '@/services/UserService'

export function addAuthenticationToken (data, headers) {
  if (userService.isLoggedIn()) headers['X-UserId'] = userService.user().token + "dd";
  return data;
}

export default axios.create({
  baseURL: '/api',
  transformRequest: [].concat(
    axios.defaults.transformRequest,
    addAuthenticationToken
  )
})