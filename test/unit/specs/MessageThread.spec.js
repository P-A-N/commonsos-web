import MessageThread from '@/components/MessageThread'
import {mount} from '../test-utils'

describe('MessageThread.vue', () => {
  it('should display message threads', (done) => {

    let wrapper = mount(MessageThread)

    setTimeout(() => {
      expect(wrapper.text()).toContain('Send')
      done()
    }, 0)
  })
})
