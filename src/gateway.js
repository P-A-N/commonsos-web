import axios from 'axios';
import notifications from '@/services/notifications'

let axiosInstance = axios.create({
  baseURL: '/api',
})

export let handleError = error => {
  if (401 === error.response.status) {
    window.$router.push('/login')
    return Promise.reject(error)
  }
  else if (468 === error.response.status) {
    return Promise.reject(error.response.data)
  }
  else {
    notifications.e('Service not available')
    return Promise.reject(error)
  }
}

axiosInstance.interceptors.response.use(response => response, handleError);

export default axiosInstance