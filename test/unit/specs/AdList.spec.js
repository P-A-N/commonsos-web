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
      expect(wrapper.text()).toContain('title1 description1 location1 1.11')
      expect(wrapper.text()).toContain('title2 description2 location2 2.22')
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

  describe('accepting an ad', function () {

    beforeEach(function () {
      gateway.post.and.returnValue(Promise.resolve({}))
      gateway.get.and.returnValue(Promise.resolve({
          data: [
            {id: 'ad1', title: 'title1', createdBy: 'user1', acceptable: true},
            {id: 'ad2', title: 'title2', createdBy: 'user2', acceptable: false}
          ]
      }))
    });

    it('own ad cannot be accepted', (done) => {
      let wrapper = mount(AdList)

      setTimeout(() => {
        let ads = wrapper.findAll('.ad')

        expect(ads.at(0).contains('button.accept-ad')).toBeTruthy()
        expect(ads.at(1).contains('button.accept-ad')).toBeFalsy()
        done()
      }, 0)
    });

    it('does nothing if user does not confirm', (done) => {
      spyOn(window, 'confirm').and.returnValue(false)
      let wrapper = mount(AdList)

      setTimeout(() => {
        wrapper.findAll('button.accept-ad').at(0).trigger('click')

        let ads = wrapper.findAll('.ad')
        expect(ads.length).toBe(2)
        expect(gateway.post).not.toHaveBeenCalled()
        done()
      }, 0)
    })

    it('accepts ad', (done) => {
      spyOn(notifications, 'i')
      spyOn(window, 'confirm').and.returnValue(true)
      gateway.post.and.returnValue(Promise.resolve({data: {id: 'ad1', acceptedBy: 'user2'}}))

      let wrapper = mount(AdList)

      setTimeout(() => {
        wrapper.findAll('button.accept-ad').at(0).trigger('click')

        setTimeout(() => {
          expect(gateway.post).toHaveBeenCalledWith('/ads/ad1/accept')
          expect(router.push).toHaveBeenCalledWith('/community/agreements')
          expect(notifications.i).toHaveBeenCalledWith('Advertisement successfully accepted')
          done()
        }, 0)
      }, 0)
    })
  });
})
