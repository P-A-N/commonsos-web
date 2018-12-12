import {mount, router} from '../test-utils'
import EditProfile from '@/components/EditProfile'
import userService from '@/services/UserService'
import gateway from '@/gateway'

describe('EditProfile.vue', () => {

  beforeEach(() => {
    let user = {
      id: 123,
      firstName: 'John',
      lastName: 'Doe',
      description: 'deep',
      location: 'home',
      notUsedProperty: 'value'
    }

    spyOn(userService, 'user').and.returnValue(user)
    spyOn(router, 'back')
  })

  it('prefills form with original data', (done) => {
    let wrapper = mount(EditProfile)

    setTimeout(() => {
      expect(wrapper.find('INPUT[data-vv-name="firstName"]').element.value).toBe('John')
      expect(wrapper.find('INPUT[data-vv-name="lastName"]').element.value).toBe('Doe')
      expect(wrapper.find('INPUT[data-vv-name="description"]').element.value).toBe('deep')
      expect(wrapper.vm.localUser).toEqual({
        id: 123,
        firstName: 'John',
        lastName: 'Doe',
        description: 'deep',
        location: 'home'
      })
      done()
    }, 0)
  })

  it('requires first name', (done) => {
    spyOn(gateway, 'post')
    let wrapper = mount(EditProfile)

    wrapper.vm.localUser.firstName = ''

    wrapper.find('button.submit-form').trigger('click')

    setTimeout(() => {
      expect(gateway.post).not.toHaveBeenCalled()
      expect(router.back).not.toHaveBeenCalled()
      done()
    }, 0)
  })

  it('requires last name', (done) => {
    spyOn(gateway, 'post')
    let wrapper = mount(EditProfile)

    wrapper.vm.localUser.lastName = ''
    wrapper.vm.localUser.description = 'from Denmark'

    wrapper.find('button.submit-form').trigger('click')

    setTimeout(() => {
      expect(gateway.post).not.toHaveBeenCalled()
      expect(router.back).not.toHaveBeenCalled()
      done()
    }, 0)
  })

  it('submits changes to backend', (done) => {
    spyOn(gateway, 'post').and.returnValue(Promise.resolve({data:{}}))
    let wrapper = mount(EditProfile)

    wrapper.vm.localUser.firstName = 'Enrico'
    wrapper.vm.localUser.lastName = 'Pedersen'
    wrapper.vm.localUser.description = 'from Denmark'

    wrapper.find('button.submit-form').trigger('click')

    setTimeout(() => {
      expect(gateway.post).toHaveBeenCalledWith('/users/123', {
        id: 123,
        firstName: 'Enrico',
        lastName: 'Pedersen',
        description: 'from Denmark',
        location: 'home'
      })
      expect(router.back).toHaveBeenCalled()
      done()
    }, 0)
  })
})
