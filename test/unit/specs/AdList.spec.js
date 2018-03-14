import Vue from 'vue'
import AdList from '@/components/AdList'
import {mount} from '@vue/test-utils'

describe('AdList.vue', () => {
  it('should display ads list', (done) => {
    window.gateway = jasmine.createSpyObj('Gateway', ['get'])
    window.gateway.get.and.returnValue(Promise.resolve({
      data: [
        {userId: 'user1', title: 'title1', description: 'description1', points: 1.11, location: 'location1'},
        {userId: 'user2', title: 'title2', description: 'description2', points: 2.22, location: 'location2'}
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

  it('should open "create ad" form', () => {
    const Constructor = Vue.extend(AdList)
    const component = new Constructor().$mount()
    window.router = jasmine.createSpyObj('Router', ['push'])

    component.$el.querySelector('button').click()

    expect(window.router.push).toHaveBeenCalledWith('ads/create')
  })

  it('should hide accepted ad', (done) => {
    window.gateway = jasmine.createSpyObj('Gateway', ['get', 'post'])
    window.gateway.get.and.returnValue(Promise.resolve({
      data: [{id: 'ad1', title: 'title1'}, {id: 'ad2', title: 'title2'}]
    }));
    window.gateway.post.and.returnValue(Promise.resolve({}));

    let wrapper = mount(AdList)

    setTimeout(() => {
      wrapper.findAll('button.accept-ad').at(0).trigger('click')

      setTimeout(() => {
        let adRows = wrapper.vm.$el.querySelectorAll('table tbody tr')
        expect(adRows.length).toBe(1)
        expect(adRows[0].textContent).toContain('title2')
        done()
      }, 0)
    }, 0)
  })
})
