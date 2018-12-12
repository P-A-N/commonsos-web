import messagePoller from '@/services/MessagePoller'
import gateway from '@/gateway'
import eventbus from '@/eventbus'

describe('MessagePoller', () => {

  afterEach(() => {
    jasmine.clock().uninstall()
  })

  it('starts polling', function () {
    jasmine.clock().install()
    spyOn(messagePoller, 'checkForUnreadThreads')

    messagePoller.start()

    expect(messagePoller.checkForUnreadThreads.calls.count()).toBe(1)
    jasmine.clock().tick(30000)
    expect(messagePoller.checkForUnreadThreads.calls.count()).toBe(2)
  })

  it('sends event with update count', done => {
    spyOn(eventbus, '$emit')
    spyOn(gateway, 'get').and.returnValue(Promise.resolve({data: {count: 77}}))

    messagePoller.checkForUnreadThreads()

    expect(gateway.get).toHaveBeenCalledWith('/message-threads/unread-count', {noLoader: true})
    setTimeout(() => {
      expect(eventbus.$emit).toHaveBeenCalledWith('unread-messages-count', 77)
      done()
    }, 0)
  });

  it('stops polling', function () {
    jasmine.clock().install()
    spyOn(messagePoller, 'checkForUnreadThreads')
    messagePoller.start()
    expect(messagePoller.checkForUnreadThreads.calls.count()).toBe(1)

    messagePoller.stop()

    jasmine.clock().tick(30000)
    expect(messagePoller.checkForUnreadThreads.calls.count()).toBe(1)
  })

})