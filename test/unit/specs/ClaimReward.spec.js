import {mount} from '../test-utils'
import ClaimReward from '@/components/ClaimReward'
import gateway from '@/gateway'
import userService from '@/services/UserService'

describe('ClaimReward.vue', () => {

  it('claims reward', (done) => {
    spyOn(userService, 'loadUser')
    spyOn(gateway, 'post').and.returnValue(Promise.resolve({data: {amount: 1299.01}}))

    let props = jasmine.createSpyObj('props', ['closeModal'])
    const wrapper = mount(ClaimReward, {propsData: props})
    wrapper.vm.code = '12345'

    wrapper.find('button').trigger('click')

    setTimeout(function() {
      expect(gateway.post).toHaveBeenCalledWith('/claim-reward', {code: '12345'})
      expect(wrapper.text()).toContain('You have successfully claimed your reward of 1299.01 points!')
      expect(props.closeModal).toHaveBeenCalled()
      expect(userService.loadUser).toHaveBeenCalled()
      done()
    }, 0)
  })

  it('claim fails with error', (done) => {
    const wrapper = mount(ClaimReward)
    spyOn(gateway, 'post').and.returnValue(Promise.reject({key: 'error key'}))
    wrapper.vm.code = 'wrongcode'

    wrapper.find('button').trigger('click')

    setTimeout(function() {
      expect(gateway.post).toHaveBeenCalledWith('/claim-reward', {code: 'wrongcode'})
      expect(wrapper.text()).toContain('error key')
      done()
    }, 0)
  })
})