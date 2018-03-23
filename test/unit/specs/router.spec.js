import router from '@/router'
import userService from '@/services/UserService'

describe('router', () => {

  it('redirects to login if user is not authenticated', () => {
    spyOn(userService, 'isLoggedIn').and.returnValue(false)

    router.push('/protected')

    expect(router.currentRoute.path).toEqual('/login')
  })

  it('for authenticated user allows to route to any path', () => {
    spyOn(userService, 'isLoggedIn').and.returnValue(true)

    router.push('/protected')

    expect(router.currentRoute.path).toEqual('/protected')
  })

  it('always allows to login', function () {
    spyOn(userService, 'isLoggedIn').and.returnValue(false)

    router.push('/login')

    expect(router.currentRoute.path).toEqual('/login')
  })
})