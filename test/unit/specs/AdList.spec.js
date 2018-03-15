import Vue from 'vue'
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

    const Constructor = Vue.extend(AdList)
    const component = new Constructor().$mount()

    setTimeout(() => {
      let adRows = component.$el.querySelectorAll('table tbody tr')
      expect(adRows[0].textContent).toContain('user1 title1 description1 1.11 location1')
      expect(adRows[1].textContent).toContain('user2 title2 description2 2.22 location2')
      done()
    }, 0)
  })

  it('should open "create ad" form', (done) => {
    const Constructor = Vue.extend(AdList)
    const component = new Constructor().$mount()

    component.$el.querySelector('button#create-ad').click()

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
        let acceptButtons = wrapper.findAll('table tbody tr')
        expect(acceptButtons.at(0).contains('button.accept-ad')).toBeTruthy()
        expect(acceptButtons.at(1).contains('button.accept-ad')).toBeFalsy()
        done()
      }, 0)
    });

    it('can be cancelled', (done) => {
      spyOn(window, 'confirm').and.returnValue(false)
      let wrapper = mount(AdList)

      setTimeout(() => {
        wrapper.findAll('button.accept-ad').at(0).trigger('click')

        setTimeout(() => {
          let adRows = wrapper.vm.$el.querySelectorAll('table tbody tr')
          expect(adRows.length).toBe(2)
          expect(gateway.post).not.toHaveBeenCalled()
          done()
        }, 0)
      }, 0)
    })

    it('hides ad', (done) => {
      spyOn(window, 'confirm').and.returnValue(true)

      let wrapper = mount(AdList)

      setTimeout(() => {
        wrapper.findAll('button.accept-ad').at(0).trigger('click')

        setTimeout(() => {
          let adRows = wrapper.vm.$el.querySelectorAll('table tbody tr')
          expect(adRows.length).toBe(1)
          expect(adRows[0].textContent).toContain('title2')
          expect(gateway.post).toHaveBeenCalledWith('/ads/ad1/accept')
          done()
        }, 0)
      }, 0)
    })

  });
})
