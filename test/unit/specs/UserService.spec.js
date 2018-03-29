import userService from '@/services/UserService'
import eventbus from '@/eventbus'
import gateway from '@/gateway'

describe('UserService.spec', () => {

  describe('login', () => {

    it('succeeds', (done) => {
      spyOn(eventbus, '$emit')
      spyOn(gateway, 'post').and.returnValue(Promise.resolve({data: {username: 'user'}}))

      userService.login('user', 'secret').then(() => {
        expect(eventbus.$emit).toHaveBeenCalledWith('userChanged', {username: 'user'})
        expect(gateway.post).toHaveBeenCalledWith('/login', {username: 'user', password: 'secret'})
        done()
      })
    })

    it('fails', (done) => {
      spyOn(gateway, 'post').and.returnValue(Promise.reject({}))

      userService.login('wrong', 'password').catch(() => done())
    })
  });

  it('logs out user', (done) => {
    userService._user = {username: 'username'}

    spyOn(eventbus, '$emit')
    spyOn(gateway, 'post').and.returnValue(Promise.resolve())

    userService.logout().then(() => {
      expect(userService._user).toBe(null)
      expect(eventbus.$emit).toHaveBeenCalledWith('userChanged', null)
      expect(gateway.post).toHaveBeenCalledWith('/logout')
      done()
    })
  });

  describe('isLoggedIn', () => {
    it('true', () => {
      userService._user = {username: "foo"}
      expect(userService.isLoggedIn()).toBeTruthy()
    });

    it('false', () => {
      userService._user = null
      expect(userService.isLoggedIn()).toBeFalsy()
    });
  })

  afterEach(() => localStorage.clear())
})
