import axios from 'axios';
import router from '@/router';


let axiosInstance = axios.create({
  baseURL: '/api',
})

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (401 === error.response.status) {
      router.push('/login')
    }
    else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance