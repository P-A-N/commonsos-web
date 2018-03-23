import userService from '@/services/UserService'
import eventbus from '@/eventbus'

describe('UserService.spec', () => {

  describe('login', () => {

    beforeEach(() => {
      spyOn(userService, 'predefinedUsers').and.returnValue({user: 'secret'})
    })

    it('should resolve promise for valid credentials', (done) => {
      spyOn(eventbus, '$emit')

      userService.login('user', 'secret').then(r => {
        let user = {userName: 'user'}
        expect(localStorage.getItem('user')).toBe(JSON.stringify(user))
        expect(eventbus.$emit).toHaveBeenCalledWith('login', user)
        done()
      })
    })

    it('should reject promise for invalid credentials', (done) => {
      userService.login('wrong', 'password').catch(e => {
        expect(e.message).toEqual('Unknown username or password')
        done()
      })
    })
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

  it('provides empty user if storage format is not correct', () => {
    localStorage.setItem('user', 'username')

    expect(userService.user()).toEqual({})
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
