import AgreementList from '@/components/AgreementList'
import {mount} from '@vue/test-utils'
import router from '@/router'
import gateway from '@/gateway'
import Vue from 'vue'
import VueMoment from 'vue-moment'

describe('AgreementList.vue', () => {

  beforeEach(() => {
    spyOn(gateway, 'get').and.returnValue(Promise.resolve({}))
    spyOn(router, 'push')
    Vue.use(VueMoment)
    jasmine.clock().mockDate(new Date('2018-03-19T11:58:00'));
  })

  it('should display my agreements', (done) => {
    gateway.get.and.returnValue(Promise.resolve({
      data: [
        {createdAt: '2018-01-30T22:51:00', providerId: 'user1', title: 'title1', description: 'description1', location: 'my home', points: 1.11},
        {createdAt: '2018-02-24T11:22:33', providerId: 'user2', title: 'title2', description: 'description2', location: 'my home', points: 2.22}
      ]
    }))

    let wrapper = mount(AgreementList)

    setTimeout(() => {
      let adRows = wrapper.findAll('table tbody tr')
      expect(adRows.at(0).text()).toContain('2 months ago user1 title1 description1 my home 1.11')
      expect(adRows.at(1).text()).toContain('23 days ago user2 title2 description2 my home 2.22')
      expect(gateway.get).toHaveBeenCalledWith('agreements')
      done()
    }, 0)
  })
})
