import Profile from '@/components/Profile'
import {mount} from '../test-utils'
import userService from '@/services/UserService'

describe('Profile.vue', () => {

  it('should display user profile', (done) => {
    spyOn(userService, 'user').and.returnValue({fullName: 'foo bar'})
    let wrapper = mount(Profile)

    setTimeout(() => {
      expect(wrapper.find('.admin').element).toBeUndefined()
      expect(wrapper.text()).toContain('foo bar')
      done()
    }, 0)
  })

  it('should logout user', () => {
    spyOn(userService, 'user').and.returnValue({fullName: 'foo bar'})
    spyOn(userService, 'logout')
    let wrapper = mount(Profile)

    wrapper.find('button.logout').trigger('click')

    expect(userService.logout).toHaveBeenCalled()
  })
})
