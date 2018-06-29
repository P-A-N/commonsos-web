import axios from 'axios';
import notifications from '@/services/notifications'
import eventbus from '@/eventbus'
import i18n from '@/i18n'
import userService from '@/services/UserService'

let axiosInstance = axios.create({
  baseURL: '/api',
})

export default axiosInstance

axiosInstance.interceptors.request.use(
  config => showLoaderIfNeeded(config),
  err => Promise.reject(err))

axiosInstance.interceptors.response.use(
  response => {
    hideLoaderIfNeeded(response.config)
    return response
  }, (error) => {
    hideLoaderIfNeeded(error.config)
    return handleError(error)
  });

export let handleError = error => {
  if (503 === error.response.status) {
    notifications.e(i18n.t('Down for maintenance'))
    return Promise.reject(error)
  }
  if (401 === error.response.status) {
    userService.logout()
    return Promise.reject(error)
  }
  else if (468 === error.response.status) {
    notifications.e(i18n.t(error.response.data.key))
    return Promise.reject(error.response.data)
  }
  else {
    notifications.e('Service not available')
    return Promise.reject(error)
  }
}

function showLoaderIfNeeded(config) {
  if (config.noLoader) return config
  config.loaderTimer = setTimeout(() => {
    eventbus.$emit('show-loader')
  }, 500)
  return config
}

function hideLoaderIfNeeded(config) {
  if (config.noLoader) return
  clearTimeout(config.loaderTimer)
  eventbus.$emit('hide-loader')
}