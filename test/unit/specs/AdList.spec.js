import AdList from '@/components/AdList'
import {mount, shallow} from '@vue/test-utils'
import router from '@/router'
import gateway from '@/gateway'
import notifications from '@/services/notifications'

describe('AdList.vue', () => {

  beforeEach(() => {
    spyOn(gateway, 'get').and.returnValue(Promise.resolve({}))
    spyOn(gateway, 'post').and.returnValue(Promise.resolve({}))
    spyOn(router, 'push')
  })

  it('should display ads list', (done) => {
    gateway.get.and.returnValue(Promise.resolve({
      data: [
        {createdBy: 'user1', title: 'title1', description: 'description1', points: 1.11, location: 'location1', acceptable: true},
        {createdBy: 'user2', title: 'title2', description: 'description2', points: 2.22, location: 'location2', acceptable: false}
      ]
    }))

    let wrapper = mount(AdList)

    setTimeout(() => {
      let ads = wrapper.findAll('.ad')
      expect(ads.at(0).text()).toContain('title1')
      expect(ads.at(0).text()).toContain('1.11')
      expect(ads.at(0).text()).toContain('description1')
      expect(ads.at(0).text()).toContain('location1')
      expect(ads.at(1).text()).toContain('title2')
      expect(ads.at(1).text()).toContain('2.22')
      expect(ads.at(1).text()).toContain('description2')
      expect(ads.at(1).text()).toContain('location2')
      done()
    }, 0)
  })

  xit('should open "create ad" form', (done) => {
    let wrapper = shallow(AdList)

    wrapper.find('button#create-ad').trigger('click')

    setTimeout(() => {
      expect(router.push).toHaveBeenCalledWith('/ads/create')
      done()
    }, 0)
  })
})
