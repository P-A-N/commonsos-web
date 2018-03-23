import eventbus from '@/eventbus'
import router from '@/router'

export default {

  login(userName, password) {
    let user = {userName: userName}
    localStorage.setItem('user', JSON.stringify(user))
    eventbus.$emit('login', user)
    router.push('/')
  },

  logout() {
    delete localStorage.user
    eventbus.$emit('logout')
    router.push('/login')
  },

  user() {
    return JSON.parse(localStorage.getItem('user')) || {}
  },

  isLoggedIn() {
    return !!this.user().userName
  }
}