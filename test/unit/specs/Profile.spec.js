import Profile from '@/components/Profile'
import {mount} from '@vue/test-utils'
import userService from '@/services/UserService'
import VueRouter from 'vue-router'

describe('Profile.vue', () => {

  let router

  beforeEach(() => {
    router = new VueRouter()
  })

  it('should display user profile', (done) => {
    spyOn(userService, 'user').and.returnValue({fullName: 'foo bar'})
    let wrapper = mount(Profile, {router})

    setTimeout(() => {
      expect(wrapper.find('.admin').element).toBeUndefined()
      expect(wrapper.text()).toContain('foo bar')
      done()
    }, 0)
  })

  it('should logout user', () => {
    spyOn(userService, 'user').and.returnValue({fullName: 'foo bar'})
    spyOn(userService, 'logout')
    let wrapper = mount(Profile, {router})

    wrapper.find('button.logout').trigger('click')

    expect(userService.logout).toHaveBeenCalled()
  })

  it('should display topup button to admin', (done) => {
    spyOn(userService, 'user').and.returnValue({admin: true})

    let wrapper = mount(Profile, {router})

    setTimeout(() => {
      expect(wrapper.find('.admin').element).toBeDefined()
      done()
    }, 0)
  })
})
