import {mount, router} from '../test-utils'

import AdCreate from '@/components/AdCreate'
import gateway from '@/gateway'

describe('AdCreate.vue', () => {

  it('should show validation errors', (done) => {
    const wrapper = mount(AdCreate)

    wrapper.find('button').trigger('click')

    setTimeout(function() {
      expect(wrapper.text()).toContain('The title field is required.')
      expect(wrapper.text()).toContain('The description field is required.')
      expect(wrapper.text()).toContain('The reward field is required.')
      expect(wrapper.text()).toContain('The location field is required.')
      done()
    }, 0)
  })

  it('should submit ad to backend', (done) => {
    spyOn(router, 'push')
    spyOn(gateway, 'post').and.returnValue(Promise.resolve({data: {id: '123'}}))
    let props = jasmine.createSpyObj('props', ['closeModal'])
    const wrapper = mount(AdCreate, {propsData: props})
    let ad = {title: 'title', description: 'description', amount: 1.11, location: 'location', type: 'WANT'}
    wrapper.setData({ad: ad});

    wrapper.find('button').trigger('click')

    setTimeout(() => {
      expect(gateway.post).toHaveBeenCalledWith('/ads', ad)
      expect(props.closeModal).toHaveBeenCalled()
      expect(router.push).toHaveBeenCalledWith('/community/ad/123')
      done();
    }, 0);
  })
})