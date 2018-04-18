import OtherUserProfile from '@/components/OtherUserProfile'
import {mount, shallow} from '@vue/test-utils'
import userService from '@/services/UserService'
import VueRouter from 'vue-router'
import gateway from '@/gateway'

describe('OtherUserProfile.vue', () => {

  let router
  let userDataOnServer

  beforeEach(() => {
    router = new VueRouter()
    userDataOnServer = {fullName: 'other user full name', balance: 10}
    spyOn(gateway, 'get').and.returnValue(Promise.resolve({data: userDataOnServer}))
  })

  it('should display other user profile', (done) => {
    spyOn(userService, 'user').and.returnValue({admin: false})

    let wrapper = mount(OtherUserProfile, {router, propsData: {userId: 'otheruserid'}})

    setTimeout(() => {
      expect(wrapper.find('.top-up').element).toBeUndefined()
      expect(wrapper.text()).toContain('other user full name')
      expect(gateway.get).toHaveBeenCalledWith('/users/otheruserid')
      done()
    }, 0)
  })

  it('should display topup button to admin', (done) => {
    spyOn(userService, 'user').and.returnValue({admin: true})

    let wrapper = shallow(OtherUserProfile, {router})

    setTimeout(() => {
      expect(wrapper.find('.top-up').element).toBeDefined()
      done()
    }, 0)
  })

  it('should reload user balance after modal topup is done', (done) => {
    spyOn(userService, 'user').and.returnValue({admin: true})
    let wrapper = shallow(OtherUserProfile, {router})

    setTimeout(() => {
      expect(wrapper.vm.otherUser.balance).toBe(10)

      userDataOnServer.balance = 20
      wrapper.vm.paymentDone()

      setTimeout(() => {
        expect(wrapper.vm.otherUser.balance).toBe(20)
        done()
      }, 0)
    }, 0)
  })
})
