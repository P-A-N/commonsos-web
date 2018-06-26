import {mount, router} from '../test-utils'
import userService from '@/services/UserService'
import Avatar from '@/components/Avatar'

describe('Avatar.vue', () => {

  it('should show user profile when clicked', (done) => {
    spyOn(router, 'push')
    spyOn(userService, 'user').and.returnValue({fullName: 'foo bar'})
    let wrapper = mount(Avatar, {propsData: {user: {id: 'userid'}}})

    wrapper.find('img').trigger('click')

    setTimeout(() => {
      expect(router.push).toHaveBeenCalledWith('/profile/userid')
      done()
    }, 0)
  })
})
