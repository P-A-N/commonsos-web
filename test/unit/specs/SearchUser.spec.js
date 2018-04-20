import {mount, router} from '../test-utils'
import SearchUser from '@/components/SearchUser'
import gateway from '@/gateway'

describe('SearchUser.vue', () => {
  let wrapper

  beforeEach(() => {
    spyOn(gateway, 'get').and.returnValue(Promise.resolve({data: [{id: '0', fullName: 'foo'}, {id: '1', fullName: 'foobar'}]}))
    wrapper = mount(SearchUser)
  })

  it('searches users', (done) => {
    wrapper.vm.filter = 'foo'

    wrapper.find('input').trigger('keyup')

    setTimeout(() => {
      expect(wrapper.findAll('.user').at(0).text()).toContain('foo')
      expect(wrapper.findAll('.user').at(1).text()).toContain('foobar')
      expect(gateway.get).toHaveBeenCalledWith('/users?q=foo')
      done()
    }, 0)
  })

  it('allows to see other user profile', (done) => {
    wrapper.vm.filter = 'foo'
    wrapper.find('input').trigger('keyup')

    setTimeout(() => {
      spyOn(router, 'push')
      wrapper.findAll('.user').at(1).trigger('click')

      setTimeout(() => {
        expect(router.push).toHaveBeenCalledWith('/profile/1')
        done()
      }, 0)
    }, 0)
  })
})
