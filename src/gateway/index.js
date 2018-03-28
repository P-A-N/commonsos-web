import axios from 'axios';
import router from '@/router';
import notifications from '@/services/notifications'

let axiosInstance = axios.create({
  baseURL: '/api',
})

export let errorHandler = error => {
  if (401 === error.response.status) {
    router.push('/login')
  }
  else {
    notifications.e('Service not available')
    return Promise.reject(error);
  }
}

axiosInstance.interceptors.response.use(response => response, errorHandler);

export default axiosInstance