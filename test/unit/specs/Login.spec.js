import {mount} from '@vue/test-utils'
import Login from '@/components/Login'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import userService from '@/services/UserService'

describe('Login.vue', () => {

  beforeEach(function () {
    Vue.use(BootstrapVue)
  })

  it('logs in', (done) => {
    const wrapper = mount(Login)
    wrapper.vm.userName = 'user'
    wrapper.vm.password = 'password'
    spyOn(userService, 'login').and.returnValue(Promise.resolve())

    wrapper.find('button').trigger('click')

    setTimeout(() => {
      expect(userService.login).toHaveBeenCalledWith('user', 'password')
      done()
    }, 0)
  })

  it('shows error message for invalid credentials', (done) => {
    const wrapper = mount(Login)
    wrapper.vm.userName = 'wrong'
    wrapper.vm.password = 'password'
    spyOn(userService, 'login').and.returnValue(Promise.reject({}))

    wrapper.find('button').trigger('click')

    setTimeout(() => {
      expect(wrapper.text()).toContain('Invalid username or password')
      done()
    }, 0)
  })
})
