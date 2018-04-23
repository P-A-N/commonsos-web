import Messages from '@/components/Messages'
import {mount} from '../test-utils'
import gateway from '@/gateway'

describe('Messages.vue', () => {

  let threads = [{
    title: 'Thread one',
    users: [{id: '22'}]
  }, {
    title: 'Thread two',
    users: [{id: '22'}]
  }]

  it('should display existing message theads', (done) => {
    spyOn(gateway, 'get').and.returnValue(Promise.resolve({data: threads}))

    let wrapper = mount(Messages)

    setTimeout(() => {
      expect(wrapper.text()).toContain('Thread one')
      expect(wrapper.text()).toContain('Thread two')
      expect(gateway.get).toHaveBeenCalledWith('/message-threads')
      done()
    }, 0)
  })
})
