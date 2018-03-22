import {mount} from '@vue/test-utils'
import ClaimReward from '@/components/ClaimReward'
import gateway from '@/gateway'
import router from '@/router'

describe('ClaimReward.vue', () => {

  it('claims reward', (done) => {
    const wrapper = mount(ClaimReward)
    spyOn(router, 'push')
    spyOn(gateway, 'post').and.returnValue(Promise.resolve({data: {amount: 1299.01}}))
    wrapper.vm.code = '12345'

    wrapper.find('button').trigger('click')

    setTimeout(function() {
      expect(gateway.post).toHaveBeenCalledWith('/claim-reward', {code: '12345'})
      expect(wrapper.text()).toContain('You have successfully claimed your reward of 1299.01 points!')
      done()
    }, 0)
  })

  it('failed claim should display error', (done) => {
    const wrapper = mount(ClaimReward)
    spyOn(gateway, 'post').and.returnValue(Promise.reject({response: {statusText: 'error reason'}}))
    wrapper.vm.code = 'wrongcode'

    wrapper.find('button').trigger('click')

    setTimeout(function() {
      expect(gateway.post).toHaveBeenCalledWith('/claim-reward', {code: 'wrongcode'})
      expect(wrapper.text()).toContain('Failed to claim reward. Please verify that you are using correct code and you are eligible to claim it!')
      done()
    }, 0)
  })
})