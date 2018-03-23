import userService from '@/services/UserService'
import eventbus from '@/eventbus'

describe('UserService.spec', () => {

  it('logs in user', () => {
    spyOn(eventbus, '$emit')

    userService.login('username', 'password')

    let user = {userName: 'username'}
    expect(localStorage.getItem('user')).toBe(JSON.stringify(user))
    expect(eventbus.$emit).toHaveBeenCalledWith('login', user)
  });

  it('logs out user', () => {
    localStorage.setItem('user', JSON.stringify({userName: 'username'}))
    spyOn(eventbus, '$emit')

    userService.logout()

    expect(userService.user().userName).toBe(undefined)
    expect(eventbus.$emit).toHaveBeenCalledWith('logout')
  });

  it('provides logged in user from localStorage', () => {
    localStorage.setItem('user', '{"foo": "bar"}')

    expect(userService.user()).toEqual({foo: "bar"})
  })

  it('provides empty user if not logged in', () => {
    expect(userService.user()).toEqual({})
  })

  describe('isLoggedIn', () => {
    it('return true', () => {
      localStorage.setItem('user', JSON.stringify({userName: 'username'}))
      expect(userService.isLoggedIn()).toBeTruthy()
    });

    it('return false', () => {
      localStorage.setItem('user', JSON.stringify({}))
      expect(userService.isLoggedIn()).toBeFalsy()
    });
  })

  afterEach(() => localStorage.clear())
})
