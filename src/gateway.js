import axios from 'axios';
import notifications from '@/services/notifications'
import eventbus from '@/eventbus'

let axiosInstance = axios.create({
  baseURL: '/api',
})

export let handleError = error => {
  if (401 === error.response.status) {
    window.$router.push('/login')
    return Promise.reject(error)
  }
  else if (468 === error.response.status) {
    notifications.e(error.response.data.key)
    return Promise.reject(error.response.data)
  }
  else {
    notifications.e('Service not available')
    return Promise.reject(error)
  }
}

axiosInstance.interceptors.request.use(
  config => {
    if (config.noLoader) return config
    config.loaderTimer = setTimeout(() => {
      eventbus.$emit('show-loader')
    }, 500)
    return config
  },
  err => Promise.reject(err)
)

axiosInstance.interceptors.response.use(
  response => {
    clearTimeout(response.config.loaderTimer)
    eventbus.$emit('hide-loader')
    return response
  }, handleError
)

export default axiosInstance