import MessageThread from '@/components/MessageThread'
import {mount} from '../test-utils'
import gateway from '@/gateway'

describe('MessageThread.vue', () => {
  it('should display existing messages and metadata for existing thread', (done) => {
    let messages = [
      {text: 'Hello my friend', createdAt: '2018-04-07T20:51:00', createdBy: '1'},
      {text: 'Hi!', createdAt: '2018-04-09T21:51:00', createdBy: '1'}
    ]
    let thread = {
      title: 'Thread title',
      parties: [{id: '22', fullName: 'Satu Haruto'}],
      ad: {payable: true}
    }

    spyOn(gateway, 'get').and.callFake((url, data) => {
      if (url === '/message-threads/11') return Promise.resolve({data: thread})
      if (url === '/message-threads/11/messages') return Promise.resolve({data: messages})
      fail()
    })

    let wrapper = mount(MessageThread, {propsData: {threadId: '11'}})
    wrapper.vm.user = {id: '1'}

    setTimeout(() => {
      expect(wrapper.text()).toContain('Thread title')
      expect(wrapper.text()).toContain('Satu Haruto')
      expect(wrapper.text()).toContain('Hello my friend')
      expect(wrapper.text()).toContain('Hi!')
      expect(wrapper.text()).toContain('Pay')
      done()
    }, 0)
  })

  it('should post new message to backend', (done) => {
    jasmine.clock().mockDate(new Date('2018-04-07T20:51:01Z'));
    spyOn(gateway, 'post').and.returnValue(Promise.resolve({data: {createdAt: '2018-04-07T20:51:00Z'}}))
    let wrapper = mount(MessageThread)
    wrapper.vm.user = {id: '1'}
    wrapper.vm.threadId = '11'
    wrapper.vm.messageText = 'Hello'

    wrapper.find('button[type=submit]').trigger('click')

    expect(wrapper.text()).toContain('Hello')
    expect(wrapper.text()).not.toContain('a few seconds ago')

    setTimeout(() => {
      expect(wrapper.text()).toContain('Hello')
      expect(wrapper.vm.messageText).toBe('')
      expect(gateway.post).toHaveBeenCalledWith('/message-threads/11/messages', {threadId: '11', text: 'Hello'})
      expect(wrapper.text()).toContain('a few seconds ago')
      done()
    }, 0)
  })

  it('should poll messages from backend', (done) => {
    let messages = [{id: '1', text: 'Old message', createdAt: '2018-04-07T20:51:00', createdBy: '1'}]
    let messages2 = [{id: '2', text: 'New message', createdAt: '2018-04-07T20:51:00', createdBy: '1'}]

    spyOn(gateway, 'get').and.returnValues(
      Promise.resolve({data: {parties: [{}]}}),
      Promise.resolve({data: messages}),
      Promise.resolve({data: messages2})
    )

    jasmine.clock().install()

    let wrapper = mount(MessageThread, {propsData: {threadId: '11'}})
    wrapper.vm.user = {id: '1'}

    jasmine.clock().tick(5000)
    jasmine.clock().uninstall()

    setTimeout(() => {
      expect(wrapper.text()).toContain('New message')
      done()
    }, 0)
  })
})
