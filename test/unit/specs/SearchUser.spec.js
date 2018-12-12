import {mount, router} from '../test-utils'
import SearchUser from '@/components/SearchUser'
import gateway from '@/gateway'

describe('SearchUser.vue', () => {
  let wrapper

  beforeEach(() => {
    spyOn(gateway, 'get').and.returnValue(Promise.resolve({data: [{id: '0', fullName: 'foo'}, {id: '1', fullName: 'foobar'}]}))
    wrapper = mount(SearchUser)
  })

  afterEach(() => {
    jasmine.clock().uninstall()
  })

  it('searches users', (done) => {
    jasmine.clock().install()
    wrapper.vm.filter = 'foo'

    wrapper.find('input').trigger('keyup')

    jasmine.clock().tick(299)
    expect(gateway.get).not.toHaveBeenCalled()
    jasmine.clock().tick(1)
    jasmine.clock().uninstall()

    setTimeout(() => {

      expect(wrapper.findAll('.user').at(0).text()).toContain('foo')
      expect(wrapper.findAll('.user').at(1).text()).toContain('foobar')
      expect(gateway.get).toHaveBeenCalledWith('/users?q=foo')
      done()
    }, 0)
  })

  it('allows to see other user profile', (done) => {
    jasmine.clock().install()
    wrapper.vm.filter = 'foo'
    wrapper.find('input').trigger('keyup')

    jasmine.clock().tick(300)
    jasmine.clock().uninstall()

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
