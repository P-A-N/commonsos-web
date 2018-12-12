import AdList from '@/components/AdList'
import {mount} from '../test-utils'

describe('AdList.vue', () => {

  it('should display ads list', (done) => {
    let ads = [
      {createdAt: '2018-02-13T12:30Z', title: 'title1', points: 1.11, location: 'location1', type: 'GIVE'},
      {createdAt: '2018-02-23T15:40Z', title: 'title2', points: 2.22, location: 'location2', type: 'WANT'}
    ]

    let wrapper = mount(AdList, {propsData: {ads: ads}})

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
