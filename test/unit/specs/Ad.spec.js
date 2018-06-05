import Ad from '@/components/Ad'
import {mount} from '../test-utils'
import gateway from '@/gateway'

describe('Ad.vue', () => {

  it('should display ad details', (done) => {
    spyOn(gateway, 'get').and.returnValue(Promise.resolve({data: {
        createdAt: '2018-02-23T15:40Z',
        title: 'Mayor job',
        description: 'Nice details',
        points: 2.22,
        location: 'location2',
        type: 'WANT',
        own: false,
        createdBy: {id: 22, avatarUrl: ''}
      }}))

    let wrapper = mount(Ad, {propsData: {id: '1'}})

    setTimeout(() => {
      expect(wrapper.text()).toContain('WANT')
      expect(wrapper.text()).toContain('Nice details')
      expect(wrapper.text()).toContain('Mayor job')
      expect(wrapper.findAll('.message-button').length).toBe(1)
      expect(gateway.get).toHaveBeenCalledWith('/ads/1')
      done()
    }, 0)
  })

  it('hides pay button for non-orderable ad', (done) => {
    spyOn(gateway, 'get').and.returnValue(Promise.resolve({data: {
        payable: false,
        own: false,
        createdBy: {id: 22, avatarUrl: ''}
      }}))

    let wrapper = mount(Ad, {propsData: {id: '1'}})

    setTimeout(() => {
      expect(wrapper.findAll('.message-button').length).toBe(1)
      done()
    }, 0)
  })

  it('shows edit button for own ad', (done) => {
    spyOn(gateway, 'get').and.returnValue(Promise.resolve({data: {
        payable: false,
        own: true,
        createdBy: {id: 22, avatarUrl: ''}
      }}))

    let wrapper = mount(Ad, {propsData: {id: '1'}})

    setTimeout(() => {
      expect(wrapper.findAll('.edit-button').length).toBe(1)
      done()
    }, 0)
  })

  it('hides message button for own ad', (done) => {
    spyOn(gateway, 'get').and.returnValue(Promise.resolve({data: {
        payable: false,
        own: true,
        createdBy: {id: 22, avatarUrl: ''}
      }}))

    let wrapper = mount(Ad, {propsData: {id: '1'}})

    setTimeout(() => {
      expect(wrapper.findAll('.message-button').length).toBe(0)
      done()
    }, 0)
  })
})
