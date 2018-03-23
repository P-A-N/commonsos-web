import eventbus from '@/eventbus'
import router from '@/router'

export default {

  predefinedUsers() {
    return {
      worker: 'secret',
      elderly1: 'secret1',
      elderly2: 'secret2'
    }
  },

  verifyCredentials: function (userName, password) {
    let expectedPassword = this.predefinedUsers()[userName]
    return (expectedPassword === password) ? Promise.resolve({userName: userName}) : Promise.reject({message: 'Unknown username or password'})
  },

  login(userName, password) {
    return this.verifyCredentials(userName, password)
      .then(user => {
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