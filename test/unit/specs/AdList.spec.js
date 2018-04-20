import AdList from '@/components/AdList'
import {mount, router} from '../test-utils'
import gateway from '@/gateway'

describe('AdList.vue', () => {

  it('should display ads list', (done) => {
    spyOn(gateway, 'get').and.returnValue(Promise.resolve({
      data: [
        {createdAt: '2018-02-13T12:30', title: 'title1', points: 1.11, location: 'location1', type: 'GIVE'},
        {createdAt: '2018-02-23T15:40', title: 'title2', points: 2.22, location: 'location2', type: 'WANT'}
      ]
    }))

    let wrapper = mount(AdList)

    setTimeout(() => {
      let ads = wrapper.findAll('.ad')

      expect(ads.at(0).text()).toContain('title1')
      expect(ads.at(0).text()).toContain('1.11')
      expect(ads.at(0).text()).toContain('location1')
      expect(ads.at(0).text()).toContain('GIVE')

      expect(ads.at(1).text()).toContain('title2')
      expect(ads.at(1).text()).toContain('2.22')
      expect(ads.at(1).text()).toContain('location2')
      expect(ads.at(1).text()).toContain('WANT')
      done()
    }, 0)
  })
})
