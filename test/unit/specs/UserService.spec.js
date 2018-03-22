import userService from '@/services/UserService'
import eventbus from '@/eventbus'

describe('UserService.spec', function() {

  it('logs in user', function() {
    spyOn(eventbus, '$emit')

    userService.login('username', 'password')

    let user = {userName: 'username'}
    expect(localStorage.getItem('user')).toBe(JSON.stringify(user))
    expect(eventbus.$emit).toHaveBeenCalledWith('login', user)
  });

  it('logs out user', function() {
    localStorage.setItem('user', JSON.stringify({userName: 'username'}))
    spyOn(eventbus, '$emit')

    userService.logout()

    expect(userService.user().userName).toBe(undefined)
    expect(eventbus.$emit).toHaveBeenCalledWith('logout')
  });

  it('provides logged in user', function() {
    userService.login('username', 'password')

    expect(userService.user().userName).toBe('username')
  })

  afterEach(() => localStorage.clear())
})
