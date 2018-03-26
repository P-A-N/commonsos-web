import eventbus from '@/eventbus'
import router from '@/router'
import gateway from '@/gateway'

export default {

  login(userName, password) {
    return gateway.post('/login', {username: userName, password})
      .then(r => {
        let user = {userName: r.data.username}
        localStorage.setItem('user', JSON.stringify(user))
        eventbus.$emit('login', user)
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
    return !!this.user().userName
  }
}