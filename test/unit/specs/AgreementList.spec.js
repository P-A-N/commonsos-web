import AgreementList from '@/components/AgreementList'
import {mount} from '@vue/test-utils'
import router from '@/router'
import gateway from '@/gateway'

describe('AgreementList.vue', () => {

  beforeEach(() => {
    spyOn(gateway, 'get').and.returnValue(Promise.resolve({}))
    spyOn(router, 'push')
  })

  it('should display my agreements', (done) => {
    gateway.get.and.returnValue(Promise.resolve({
      data: [
        {providerId: 'user1', title: 'title1', description: 'description1', location: 'my home', points: 1.11},
        {providerId: 'user2', title: 'title2', description: 'description2', location: 'my home', points: 2.22}
      ]
    }))

    let wrapper = mount(AgreementList)

    setTimeout(() => {
      let adRows = wrapper.findAll('table tbody tr')
      expect(adRows.at(0).text()).toContain('user1 title1 description1 my home 1.11')
      expect(adRows.at(1).text()).toContain('user2 title2 description2 my home 2.22')
      expect(gateway.get).toHaveBeenCalledWith('agreements')
      done()
    }, 0)
  })
})
