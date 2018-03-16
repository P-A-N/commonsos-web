import MyAdList from '@/components/MyAdList'
import {mount} from '@vue/test-utils'
import router from '@/router'
import gateway from '@/gateway'

describe('MyAdList.vue', () => {

  beforeEach(() => {
    spyOn(gateway, 'get').and.returnValue(Promise.resolve({}))
    spyOn(router, 'push')
  })

  it('should display my ads', (done) => {
    gateway.get.and.returnValue(Promise.resolve({
      data: [
        {createdBy: 'user1', acceptedBy: 'me', title: 'title1', description: 'description1', points: 1.11},
        {createdBy: 'user2', acceptedBy: 'me', title: 'title2', description: 'description2', points: 2.22}
      ]
    }))

    let wrapper = mount(MyAdList)

    setTimeout(() => {
      let adRows = wrapper.findAll('table tbody tr')
      expect(adRows.at(0).text()).toContain('user1 title1 description1 1.11')
      expect(adRows.at(1).text()).toContain('user2 title2 description2 2.22')
      expect(gateway.get).toHaveBeenCalledWith('my-ads')
      done()
    }, 0)
  })
})
