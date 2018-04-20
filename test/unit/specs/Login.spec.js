import {mount} from '../test-utils'
import Login from '@/components/Login'
import userService from '@/services/UserService'

describe('Login.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Login)
  })

  it('logs in', (done) => {
    wrapper.vm.username = 'user'
    wrapper.vm.password = 'password'
    spyOn(userService, 'login').and.returnValue(Promise.resolve())

    wrapper.find('button').trigger('click')

    setTimeout(() => {
      expect(userService.login).toHaveBeenCalledWith('user', 'password')
      done()
    }, 0)
  })

  it('shows error message for invalid credentials', (done) => {
    spyOn(userService, 'login').and.returnValue(Promise.reject({}))
    wrapper.vm.username = 'user'
    wrapper.vm.password = 'password'

    wrapper.find('button').trigger('click')

    setTimeout(() => {
      expect(wrapper.text()).toContain('Invalid username or password')
      done()
    }, 0)
  })

  it('shows validation errors', (done) => {
    wrapper.vm.username = null
    wrapper.vm.password = null

    wrapper.find('button').trigger('click')

    setTimeout(() => {
      expect(wrapper.text()).toContain('The username field is required.')
      expect(wrapper.text()).toContain('The password field is required.')
      done()
    }, 0)
  })
})
