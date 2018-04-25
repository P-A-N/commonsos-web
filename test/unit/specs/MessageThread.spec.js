import MessageThread from '@/components/MessageThread'
import {mount} from '../test-utils'
import gateway from '@/gateway'

describe('MessageThread.vue', () => {
  it('should display existing messages and metadata for existing thread', (done) => {
    let messages = [
      {text: 'Hello my friend', createdAt: '2018-04-07T20:51:00', createdBy: {}},
      {text: 'Hi!', createdAt: '2018-04-09T21:51:00', createdBy: {}}
    ]
    let thread = {
      messages: messages,
      title: 'Thread title',
      parties: [{id: '22', fullName: 'Satu Haruto'}]
    }

    spyOn(gateway, 'get').and.returnValue(Promise.resolve({data: thread}))

    let wrapper = mount(MessageThread, {propsData: {threadId: '11'}, mocks: {user: {}}})
    wrapper.vm.user = {}

    setTimeout(() => {
      expect(wrapper.text()).toContain('Thread title')
      expect(wrapper.text()).toContain('Satu Haruto')
      expect(wrapper.text()).toContain('Hello my friend')
      expect(wrapper.text()).toContain('Hi!')
      expect(gateway.get).toHaveBeenCalledWith('/message-threads/11')
      expect(wrapper.text()).toContain('Pay')
      done()
    }, 0)
  })

  it('should post new message to backend', (done) => {
    jasmine.clock().mockDate(new Date('2018-04-07T20:51:01Z'));

    spyOn(gateway, 'post').and.returnValue(Promise.resolve({data: {createdAt: '2018-04-07T20:51:00Z'}}))
    let wrapper = mount(MessageThread)
    wrapper.vm.user = {}
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
    let updatedThread = {
      id: '11',
      messages: [{id: '99', text: 'New message', createdAt: '2018-04-07T20:51:00', createdBy: {}}],
      users: [{id: '1'}]
    }
    spyOn(gateway, 'get').and.returnValue(Promise.resolve({data: updatedThread}))
    jasmine.clock().install()

    let wrapper = mount(MessageThread)
    wrapper.vm.user = {}
    wrapper.vm.threadId = '11'

    jasmine.clock().tick(5000)
    jasmine.clock().uninstall()

    setTimeout(() => {
      expect(gateway.get).toHaveBeenCalledWith('/message-threads/11')
      done()
    }, 0)
  })
})
