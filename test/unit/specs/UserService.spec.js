import userService from '@/services/UserService'
import eventbus from '@/eventbus'
import gateway from '@/gateway'
import messagePoller from '@/services/MessagePoller'

describe('UserService.spec', () => {

  describe('login', () => {

    it('succeeds', (done) => {
      spyOn(messagePoller, 'start')
      spyOn(eventbus, '$emit')
      spyOn(gateway, 'post').and.returnValue(Promise.resolve({data: {username: 'user'}}))

      userService.login('user', 'secret').then(() => {
        expect(eventbus.$emit).toHaveBeenCalledWith('userChanged', {username: 'user'})
        expect(gateway.post).toHaveBeenCalledWith('/login', {username: 'user', password: 'secret'})
        expect(window.$router.push).toHaveBeenCalledWith('/')
        expect(messagePoller.start).toHaveBeenCalled()
        done()
      })
    })

    it('fails', (done) => {
      spyOn(gateway, 'post').and.returnValue(Promise.reject({}))

      userService.login('wrong', 'password').catch(() => done())
    })
  })

  it('logs out user', (done) => {
    userService._user = {username: 'username'}

    spyOn(messagePoller, 'stop')
    spyOn(eventbus, '$emit')
    spyOn(gateway, 'post').and.returnValue(Promise.resolve())

    userService.logout().then(() => {
      expect(userService._user).toBe(null)
      expect(eventbus.$emit).toHaveBeenCalledWith('userChanged', null)
      expect(gateway.post).toHaveBeenCalledWith('/logout')
      expect(window.$router.push).toHaveBeenCalledWith('/login')
      expect(messagePoller.stop).toHaveBeenCalled()
      done()
    })
  })

  describe('isLoggedIn', () => {
    it('true', () => {
      userService._user = {username: "foo"}
      expect(userService.isLoggedIn()).toBeTruthy()
    })

    it('false', () => {
      userService._user = null
      expect(userService.isLoggedIn()).toBeFalsy()
    })
  })

  describe('create new user', () => {

    let requestedUser = {username: 'user name'}

    it('succeeds', (done) => {
      let user = {username: 'user name'}
      spyOn(gateway, 'post').and.returnValue(Promise.resolve({data: user}))
      spyOn(messagePoller, 'start')

      userService.createAndLogin(requestedUser)

      setTimeout(() => {
        expect(gateway.post).toHaveBeenCalledWith('/create-account', requestedUser)
        expect(window.$router.push).toHaveBeenCalledWith('/profile')
        expect(messagePoller.start).toHaveBeenCalled()
        done()
      }, 0);
    })

    it('fails', (done) => {
      spyOn(gateway, 'post').and.returnValue(Promise.reject({message: 'failure'}))

      userService.createAndLogin(requestedUser).catch((response) => {
        expect(response.message).toBe('failure')
        expect(gateway.post).toHaveBeenCalledWith('/create-account', requestedUser)
        expect(window.$router.push).toHaveBeenCalledTimes(0)
        done()
      })
    })
  })

})
