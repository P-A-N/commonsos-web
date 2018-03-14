import axios from 'axios';

export function addAuthenticationToken (data, headers) {
  headers['X-UserId'] = localStorage.getItem('user');
  return data;
}

export default axios.create({
  baseURL: `/api`,
  transformRequest: [].concat(
    axios.defaults.transformRequest,
    addAuthenticationToken
  )
})