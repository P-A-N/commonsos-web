import MessageThread from '@/components/MessageThread'
import {mount} from '../test-utils'
import gateway from '@/gateway'

describe('MessageThread.vue', () => {

  let ad = {id: '11', title: 'Ad title', createdBy: {ids: '22', fullNames: 'Satu Haruto'}}

  let messages = [
    {text: 'Hello my friend', createdAt: '2018-04-07T20:51:00'},
    {text: 'Hi!', createdAt: '2018-04-09T21:51:00'}
  ]

  let thread = {
    messages: messages,
    counterParty: {id: '22', fullName: 'Satu Haruto'},
    title: 'Thread title',
    users: [{id: '22', fullName: 'Satu Haruto'}]
  }

  it('should display existing messages and metadata when coming from advertisement', (done) => {
    spyOn(gateway, 'post').and.returnValue(Promise.resolve({data: thread}))

    let wrapper = mount(MessageThread, {propsData: {ad: ad}})

    setTimeout(() => {
      expect(wrapper.text()).toContain('Thread title')
      expect(wrapper.text()).toContain('Satu Haruto')
      expect(wrapper.text()).toContain('Hello my friend')
      expect(wrapper.text()).toContain('Hi!')
      expect(gateway.post).toHaveBeenCalledWith('/message-threads/for-ad/11')
      done()
    }, 0)
  })

  it('should display existing messages and metadata for existing thread', (done) => {
    let wrapper = mount(MessageThread, {propsData: {thread: thread}})

    setTimeout(() => {
      expect(wrapper.text()).toContain('Thread title')
      expect(wrapper.text()).toContain('Satu Haruto')
      expect(wrapper.text()).toContain('Hello my friend')
      expect(wrapper.text()).toContain('Hi!')
      done()
    }, 0)
  })

  it('should post new message to backend', (done) => {
    spyOn(gateway, 'post')
    let thread = {id: "11", messages: [], users: [{id: "1"}]}
    let wrapper = mount(MessageThread, {propsData: {thread: thread}})

    wrapper.vm.messageText = 'Hello'

    wrapper.find('button[type=submit]').trigger('click')

    setTimeout(() => {
      expect(wrapper.text()).toContain('Hello')
      expect(wrapper.vm.messageText).toBe('')
      expect(gateway.post).toHaveBeenCalledWith('/message-threads/11/messages', {threadId: '11', text: 'Hello'})
      done()
    }, 0)
  })

  it('should poll messages from backend', (done) => {
    let thread = {id: "11", messages: [], users: [{id: "1"}]}
    let updatedThread = {
      id: "11",
      messages: [{id: '99', text: 'New message', createdAt: '2018-04-07T20:51:00'}],
      users: [{id: "1"}]
    }
    spyOn(gateway, 'get').and.returnValue(Promise.resolve({data: updatedThread}))
    jasmine.clock().install()

    let wrapper = mount(MessageThread, {propsData: {thread: thread}})

    jasmine.clock().tick(5000)
    jasmine.clock().uninstall()

    setTimeout(() => {
      expect(wrapper.text()).toContain('New message')
      expect(gateway.get).toHaveBeenCalledWith('/message-threads/11')
      done()
    }, 0)
  })
})
