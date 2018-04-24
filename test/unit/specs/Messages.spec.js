import Messages from '@/components/Messages'
import {mount, router} from '../test-utils'
import gateway from '@/gateway'

describe('Messages.vue', () => {

  let threads = [
    {id: '1', title: 'Thread one', users: [{id: '22'}]},
    {id: '2', title: 'Thread two', users: [{id: '22'}]}
  ]

  it('should display existing message theads', (done) => {
    spyOn(gateway, 'get').and.returnValue(Promise.resolve({data: threads}))

    let wrapper = mount(Messages)

    setTimeout(() => {
      expect(wrapper.findAll('.thread').at(0).text()).toContain('Thread one')
      expect(wrapper.findAll('.thread').at(1).text()).toContain('Thread two')
      expect(gateway.get).toHaveBeenCalledWith('/message-threads')
      done()
    }, 0)
  })

  xit('should open details view when message thead is clicked', (done) => {
    spyOn(router, 'push')
    spyOn(gateway, 'get').and.returnValue(Promise.resolve({data: threads}))

    let wrapper = mount(Messages)

    setTimeout(() => {
      wrapper.findAll('.thread').at(1).trigger('click')
      expect(router.push).toHaveBeenCalledWith('/messages/2')
      done()
    }, 0)
  })
})
