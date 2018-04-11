import {mount} from '@vue/test-utils'
import CreateAccount from '@/components/CreateAccount'
import userService from '@/services/UserService'
import VueRouter from 'vue-router'

describe('CreateAccount.vue', () => {
  let wrapper
  let validUser = {
    username: 'username',
    password: 'password',
    firstName: 'first',
    lastName: 'last'
  }

  beforeEach(() => {
    let router = new VueRouter()
    wrapper = mount(CreateAccount, {router})
  })

  it('creates new account', (done) => {
    wrapper.setData({
      user: validUser,
      password2: 'password'})
    spyOn(userService, 'createAndLogin').and.returnValue(Promise.resolve({}))

    wrapper.find('button').trigger('click')

    setTimeout(() => {
      expect(userService.createAndLogin).toHaveBeenCalledWith(validUser)
      done()
    }, 0)
  })

  it('shows validation errors', (done) => {
    wrapper.vm.user = {}

    wrapper.find('button').trigger('click')

    setTimeout(() => {
      expect(wrapper.text()).toContain('The username field is required.')
      expect(wrapper.text()).toContain('The password field is required.')
      expect(wrapper.text()).toContain('The firstName field is required.')
      expect(wrapper.text()).toContain('The lastName field is required.')
      done()
    }, 0)
  })

  it('shows server errors', (done) => {
    wrapper.setData({user: validUser, password2: 'password'})
    spyOn(userService, 'createAndLogin').and.returnValue(Promise.reject({message: 'error message'}))

    wrapper.find('button').trigger('click')

    setTimeout(() => {
      expect(wrapper.text()).toContain('error message')
      done()
    }, 0)
  })

  it('shows error for not matching passwords', (done) => {
    wrapper.setData({user: validUser})
    wrapper.setData({password2: 'different'})

    setTimeout(() => {
      expect(wrapper.text()).toContain('confirmation does not match')
      done()
    }, 0)
  })
})
