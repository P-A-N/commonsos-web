import Messages from '@/components/Messages'
import {rmount} from '../test-utils'
import gateway from '@/gateway'
import messagePoller from '@/services/MessagePoller'

describe('Messages.vue', () => {

  let threads = [
    {id: '1', title: 'Thread one', parties: [{id: '22'}], lastMessage: null, creator: {}},
    {id: '2', title: 'Thread two', parties: [{id: '22', fullName: 'John Doe'}], lastMessage: {createdBy: '22', text: 'last message for thread two', createdAt: '2015-12-22T12:33:44Z'}, creator: {}}
  ]

  it('should display existing message theads', (done) => {
    jasmine.clock().mockDate(new Date('2015-12-22T13:33:44Z'))
    spyOn(gateway, 'get').and.returnValue(Promise.resolve({data: threads}))
    spyOn(messagePoller, 'checkForUnreadThreads')
    let wrapper = rmount(Messages)

    setTimeout(() => {
      expect(wrapper.findAll('.thread').at(0).text()).toContain('Thread one')
      expect(wrapper.findAll('.thread').at(1).text()).toContain('Thread two')
      expect(wrapper.findAll('.thread').at(1).text()).toContain('an hour ago')
      expect(wrapper.findAll('.thread').at(1).text()).toContain('John Doe')
      expect(wrapper.findAll('.thread').at(1).text()).toContain('last message for thread two')
      expect(gateway.get).toHaveBeenCalledWith('/message-threads')
      expect(messagePoller.checkForUnreadThreads).toHaveBeenCalled()
      done()
    }, 0)
  })
})
