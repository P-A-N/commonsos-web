import {mount, router} from '../test-utils'

import CreateGroup from '@/components/CreateGroup'
import gateway from '@/gateway'

describe('CreateGroup.vue', () => {

  describe('submitting data', function () {

    it('is disabled when no no member is selected', () => {
      const wrapper = mount(CreateGroup)
      expect(wrapper.find('button').element.disabled).toBeTruthy()
    })

    it('is enabled if at least one member is selected', (done) => {
      spyOn(router, 'push')
      spyOn(gateway, 'post').and.returnValue(Promise.resolve({data: {id: 'groupThreadId'}}))

      const props = jasmine.createSpyObj('props', ['closeModal'])
      const wrapper = mount(CreateGroup, {propsData: props})

      wrapper.setData({users: [{id: 11}, {id: 22}]});
      wrapper.vm.selected.push({id: 11})

      setTimeout(() => {
        expect(wrapper.find('button').element.disabled).toBeFalsy()
        done();
      }, 0);
    })
  })

  it('should submit group data to backend', (done) => {
    spyOn(router, 'push')
    spyOn(gateway, 'post').and.returnValue(Promise.resolve({data: {id: 'groupThreadId'}}))

    const props = jasmine.createSpyObj('props', ['closeModal'])
    const wrapper = mount(CreateGroup, {propsData: props})

    wrapper.setData({filter: 'john'});
    wrapper.setData({users: [{id: 11}, {id: 22}]});
    wrapper.setData({title: 'hello'});
    wrapper.vm.selected.push({id: 11})

    wrapper.vm.createGroup();

    setTimeout(() => {
      expect(gateway.post).toHaveBeenCalledWith('/message-threads/group', {memberIds: [11], title: 'hello'})
      expect(props.closeModal).toHaveBeenCalled()
      expect(router.push).toHaveBeenCalledWith('/messages/groupThreadId')
      done();
    }, 0);
  })
})