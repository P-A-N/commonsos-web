import axios from 'axios';
import userService from '@/services/UserService'

export function addAuthenticationToken (data, headers) {
  headers['X-UserId'] = userService.user().username;
  return data;
}

export default axios.create({
  baseURL: '/api',
  transformRequest: [].concat(
    axios.defaults.transformRequest,
    addAuthenticationToken
  )
})