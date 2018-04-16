import {mount} from '@vue/test-utils'
import SearchUser from '@/components/SearchUser'
import gateway from '@/gateway'
import VueRouter from 'vue-router'

describe('SearchUser.vue', () => {
  let wrapper

  beforeEach(() => {
    let router = new VueRouter()
    wrapper = mount(SearchUser, {router})
  })

  it('searches users', (done) => {
    wrapper.vm.filter = 'foo'
    spyOn(gateway, 'get').and.returnValue(Promise.resolve({data: [{fullName: 'foo'}, {fullName: 'bar'}]}))

    wrapper.find('input').trigger('keyup')

    setTimeout(() => {
      expect(wrapper.text()).toContain('foo')
      expect(wrapper.text()).toContain('bar')
      expect(gateway.get).toHaveBeenCalledWith('/users?q=foo')
      done()
    }, 0)
  })
})
