import axios from 'axios'
import notifications from '@/services/notifications'
import eventbus from '@/eventbus'
import i18n from '@/i18n'
import userService from '@/services/UserService'

let xsrfToken = null

let axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL || '/api'
})

export default axiosInstance

function parseXSRFToken (response) {
  function parseCookie (allCookies, name) {
    let match = allCookies.match(new RegExp('(^| \\s*)(' + name + ')=([^;]*)'))
    return (match ? decodeURIComponent(match[3]) : null)
  }

  let cookies = response.headers['set-cookie']
  if (cookies && cookies.length) {
    let parsedToken = parseCookie(cookies[0], response.config.xsrfCookieName)
    if (parsedToken) xsrfToken = parsedToken
  }
}

axiosInstance.interceptors.request.use(
  config => {
    if (config.method === 'post' && xsrfToken) {
      config.headers[config.xsrfHeaderName] = xsrfToken
    }
    return showLoaderIfNeeded(config)
  },
  err => Promise.reject(err))

axiosInstance.interceptors.response.use(
  response => {
    parseXSRFToken(response)
    hideLoaderIfNeeded(response.config)
    return response
  }, (error) => {
    hideLoaderIfNeeded(error.config)
    return handleError(error)
  })

export let handleError = error => {
  if (error.response.status === 401) {
    userService.logout()
    return Promise.reject(error)
  } else if (error.response.status === 468) {
    notifications.e(i18n.t(error.response.data.key))
    return Promise.reject(error.response.data)
  } else {
    notifications.e('Service not available')
    return Promise.reject(error)
  }
}

function showLoaderIfNeeded (config) {
  if (config.noLoader) return config
  config.loaderTimer = setTimeout(() => {
    eventbus.$emit('show-loader')
  }, 500)
  return config
}

function hideLoaderIfNeeded (config) {
  if (config.noLoader) return
  clearTimeout(config.loaderTimer)
  eventbus.$emit('hide-loader')
}
