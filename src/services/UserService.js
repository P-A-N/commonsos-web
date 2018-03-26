import eventbus from '@/eventbus'
import router from '@/router'
import gateway from '@/gateway'

export default {

  login(username, password) {
    return gateway.post('/login', {username: username, password})
      .then(r => {
        localStorage.setItem('user', JSON.stringify(r.data))
        eventbus.$emit('login', r.data)
        router.push('/')
      })
  },

  logout() {
    delete localStorage.user
    eventbus.$emit('logout')
    router.push('/login')
  },

  user() {
    try {
      return JSON.parse(localStorage.getItem('user')) || {}
    } catch (e) {
      return {}
    }
  },

  isLoggedIn() {
    return !!this.user().username
  }
}