import Profile from '@/components/Profile'
import {mount} from '@vue/test-utils'
import userService from '@/services/UserService'

describe('Profile.vue', () => {

  beforeEach(() => {
    spyOn(userService, 'user').and.returnValue({fullName: 'foo bar'})
  })

  it('should display user profile', (done) => {
    let wrapper = mount(Profile)

    setTimeout(() => {
      expect(wrapper.text()).toContain('foo bar')
      done()
    }, 0)
  })

  it('should logout user', () => {
    spyOn(userService, 'logout')

    mount(Profile).find('button.logout').trigger('click')

    expect(userService.logout).toHaveBeenCalled()
  })
})
