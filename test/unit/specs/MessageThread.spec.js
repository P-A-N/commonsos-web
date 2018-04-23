import MessageThread from '@/components/MessageThread'
import {mount} from '../test-utils'

describe('MessageThread.vue', () => {

  it('should display related advertisement', (done) => {

    let ad = {title: 'The service for sale', createdBy: {id: "22", fullName: 'Satu Haruto'}}

    let wrapper = mount(MessageThread, {propsData: {ad: ad}})

    setTimeout(() => {
      expect(wrapper.text()).toContain('The service for sale')
      expect(wrapper.text()).toContain('Satu Haruto')
      done()
    }, 0)
  })
})
