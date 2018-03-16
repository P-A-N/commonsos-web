import Vue from 'vue'
import {mount} from '@vue/test-utils'
import VeeValidate from 'vee-validate'
import AdCreate from '@/components/AdCreate'
import gateway from '@/gateway'
import router from '@/router'

describe('AdCreate.vue', () => {
  beforeEach(() => {
    Vue.use(VeeValidate)
  })

  it('should show validation errors', (done) => {
    const vm = mount(AdCreate)

    vm.find('button').trigger('click')

    setTimeout(function() {
      expect(vm.findAll('.text-danger').length).toBe(4)
      expect(vm.text()).toContain('The title field is required.')
      expect(vm.text()).toContain('The description field is required.')
      expect(vm.text()).toContain('The points field is required.')
      expect(vm.text()).toContain('The location field is required.')
      done()
    }, 0)
  })

  it('should created submit ad to backend', (done) => {
    spyOn(gateway, 'post').and.returnValue(Promise.resolve({}))
    spyOn(router, 'push')
    const vm = mount(AdCreate)
    let title = 'title'
    let description = 'description'
    let location = 'location'
    let ad = {title, description, points: 1.11, location}
    vm.setData({ad});

    vm.find('button').trigger('click')

    setTimeout(() => {
      expect(gateway.post).toHaveBeenCalledWith('/ads', ad)
      expect(router.push).toHaveBeenCalledWith('/ads')
      done();
    }, 0);
  })
})