import OtherUserProfile from '@/components/OtherUserProfile'
import {mount} from '@vue/test-utils'
import userService from '@/services/UserService'
import VueRouter from 'vue-router'
import gateway from '@/gateway'

describe('OtherUserProfile.vue', () => {

  let router

  beforeEach(() => {
    router = new VueRouter()
  })

  it('should display other user profile', (done) => {
    spyOn(userService, 'user').and.returnValue({admin: false})
    spyOn(gateway, 'get').and.returnValue(Promise.resolve({data: {fullName: 'other user full name'}}))

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

    let wrapper = mount(OtherUserProfile, {router})

    setTimeout(() => {
      expect(wrapper.find('.top-up').element).toBeDefined()
      done()
    }, 0)
  })
})
