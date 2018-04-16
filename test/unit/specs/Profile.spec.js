import Profile from '@/components/Profile'
import {mount} from '@vue/test-utils'
import userService from '@/services/UserService'
import VueRouter from 'vue-router'

describe('Profile.vue', () => {

  beforeEach(() => {
    spyOn(userService, 'user').and.returnValue({fullName: 'foo bar'})
  })

  it('should display user profile', (done) => {
    let router = new VueRouter()
    let wrapper = mount(Profile, {router})

    setTimeout(() => {
      expect(wrapper.text()).toContain('foo bar')
      done()
    }, 0)
  })

  it('should logout user', () => {
    spyOn(userService, 'logout')
    let router = new VueRouter()
    let wrapper = mount(Profile, {router})

    wrapper.find('button.logout').trigger('click')

    expect(userService.logout).toHaveBeenCalled()
  })
})
