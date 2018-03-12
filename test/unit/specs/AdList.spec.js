import Vue from 'vue'
import AdList from '@/components/AdList'

describe('AdList.vue', () => {
  it('should display ads list', (done) => {
    window.gateway = jasmine.createSpyObj('Gateway', ['get'])
    window.gateway.get.and.returnValue(Promise.resolve({
      data: [
        {title: 'title1', description: 'description1', points: 1.11, location: 'location1'},
        {title: 'title2', description: 'description2', points: 2.22, location: 'location2'}
      ]
    }));

    const Constructor = Vue.extend(AdList)
    const component = new Constructor().$mount()

    setTimeout(() => {
      let adRows = component.$el.querySelectorAll('table tbody tr')
      expect(adRows[0].textContent).toBe('title1 description1 1.11 location1')
      expect(adRows[1].textContent).toBe('title2 description2 2.22 location2')
      done()
    }, 0)
  })

  it('should open "create ad" form', () => {
    const Constructor = Vue.extend(AdList)
    const component = new Constructor().$mount()
    window.router = jasmine.createSpyObj('Router', ['push']);

    component.$el.querySelector('button').click()

    expect(router.push).toHaveBeenCalledWith('ads/create');
  });
})
