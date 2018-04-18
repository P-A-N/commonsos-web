import AdList from '@/components/AdList'
import {mount} from '@vue/test-utils'
import gateway from '@/gateway'
import VueRouter from 'vue-router'

describe('AdList.vue', () => {
  let router

  beforeEach(() => {
    router = new VueRouter()
  })

  it('should display ads list', (done) => {
    spyOn(gateway, 'get').and.returnValue(Promise.resolve({
      data: [
        {createdAt: '2018-02-13T12:30', title: 'title1', points: 1.11, location: 'location1'},
        {createdAt: '2018-02-23T15:40', title: 'title2', points: 2.22, location: 'location2'}
      ]
    }))

    let wrapper = mount(AdList, {router})

    setTimeout(() => {
      let ads = wrapper.findAll('.ad')

      expect(ads.at(0).text()).toContain('title1')
      expect(ads.at(0).text()).toContain('1.11')
      expect(ads.at(0).text()).toContain('location1')

      expect(ads.at(1).text()).toContain('title2')
      expect(ads.at(1).text()).toContain('2.22')
      expect(ads.at(1).text()).toContain('location2')
      done()
    }, 0)
  })
})
