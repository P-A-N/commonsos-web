import {mount} from '@vue/test-utils'
import ClaimReward from '@/components/ClaimReward'
import gateway from '@/gateway'
import router from '@/router'

describe('ClaimReward.vue', () => {

  it('successful claim should redirect to main view', (done) => {
    const wrapper = mount(ClaimReward)
    spyOn(router, 'push')
    spyOn(gateway, 'post').and.returnValue(Promise.resolve({}))
    wrapper.vm.code = '12345'

    wrapper.find('button').trigger('click')

    setTimeout(function() {
      expect(gateway.post).toHaveBeenCalledWith('/claim-reward', {code: '12345'})
      expect(router.push).toHaveBeenCalledWith('ads')
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
      expect(wrapper.text()).toContain('Error: error reason')
      done()
    }, 0)
  })
})