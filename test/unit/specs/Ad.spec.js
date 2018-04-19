import Ad from '@/components/Ad'
import {mount} from '@vue/test-utils'
import gateway from '@/gateway'
import VueRouter from 'vue-router'

describe('Ad.vue', () => {
  let router

  beforeEach(() => {
    router = new VueRouter()
  })

  it('should display ad details', (done) => {
    spyOn(gateway, 'get').and.returnValue(Promise.resolve({
      data: {
        createdAt: '2018-02-23T15:40',
        title: 'Mayor job',
        description: 'Nice details',
        points: 2.22,
        location: 'location2',
        type: 'WANT',
        own: false,
        createdBy: {id: 22, avatarUrl: ''}
      }
    }))

    let wrapper = mount(Ad, {router, propsData: {id: '1'}})

    setTimeout(() => {
      expect(wrapper.text()).toContain('WANT')
      expect(wrapper.text()).toContain('Nice details')
      expect(wrapper.text()).toContain('Mayor job')
      expect(wrapper.findAll('.pay-button').length).toBe(1)
      expect(gateway.get).toHaveBeenCalledWith('/ads/1')
      done()
    }, 0)
  })
})
