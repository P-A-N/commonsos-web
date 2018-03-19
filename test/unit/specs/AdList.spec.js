import AdList from '@/components/AdList'
import {mount} from '@vue/test-utils'
import router from '@/router'
import gateway from '@/gateway'

describe('AdList.vue', () => {
  beforeEach(() => {
    spyOn(gateway, 'get').and.returnValue(Promise.resolve({}))
    spyOn(gateway, 'post').and.returnValue(Promise.resolve({}))
    spyOn(router, 'push')
  })

  it('should display ads list', (done) => {
    gateway.get.and.returnValue(Promise.resolve({
      data: [
        {createdBy: 'user1', title: 'title1', description: 'description1', points: 1.11, location: 'location1'},
        {createdBy: 'user2', title: 'title2', description: 'description2', points: 2.22, location: 'location2'}
      ]
    }))

    let wrapper = mount(AdList)

    setTimeout(() => {
      let adRows = wrapper.findAll('table tbody tr')
      expect(adRows.at(0).text()).toContain('user1 title1 description1 1.11 location1')
      expect(adRows.at(1).text()).toContain('user2 title2 description2 2.22 location2')
      done()
    }, 0)
  })

  it('should open "create ad" form', (done) => {
    let wrapper = mount(AdList)

    wrapper.find('button#create-ad').trigger('click')

    setTimeout(() => {
      expect(router.push).toHaveBeenCalledWith('ads/create')
      done()
    }, 0)
  })

  describe('accepting an ad', function () {

    beforeEach(function () {
      gateway.post.and.returnValue(Promise.resolve({}))
      gateway.get.and.returnValue(Promise.resolve({
          data: [
            {id: 'ad1', title: 'title1', createdBy: 'user1'},
            {id: 'ad2', title: 'title2', createdBy: 'user2'}
          ]
      }))
    });

    it('own ad cannot be accepted', (done) => {
      window.localStorage.setItem("user", "user2")

      let wrapper = mount(AdList)

      setTimeout(() => {
        let adRows = wrapper.findAll('table tbody tr')
        expect(adRows.at(0).contains('button.accept-ad')).toBeTruthy()
        expect(adRows.at(1).contains('button.accept-ad')).toBeFalsy()
        done()
      }, 0)
    });

    it('does nothing if user does not confirm', (done) => {
      spyOn(window, 'confirm').and.returnValue(false)
      let wrapper = mount(AdList)

      setTimeout(() => {
        wrapper.findAll('button.accept-ad').at(0).trigger('click')

        let adRows = wrapper.findAll('table tbody tr')
        expect(adRows.length).toBe(2)
        expect(gateway.post).not.toHaveBeenCalled()
        done()
      }, 0)
    })

    it('accepts ad', (done) => {
      window.localStorage.setItem('user', 'user2')
      spyOn(window, 'confirm').and.returnValue(true)
      gateway.post.and.returnValue(Promise.resolve({data: {id: 'ad1', acceptedBy: 'user2'}}))

      let wrapper = mount(AdList)

      setTimeout(() => {
        wrapper.findAll('button.accept-ad').at(0).trigger('click')

        setTimeout(() => {
          expect(gateway.post).toHaveBeenCalledWith('/ads/ad1/accept')
          expect(router.push).toHaveBeenCalledWith('agreements')
          done()
        }, 0)
      }, 0)
    })
  });
})