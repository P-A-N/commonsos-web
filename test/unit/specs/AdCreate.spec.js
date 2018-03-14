import Vue from 'vue'
import {mount} from '@vue/test-utils'
import VeeValidate from 'vee-validate'
import AdCreate from '@/components/AdCreate'

Vue.use(VeeValidate)

describe('AdCreate.vue', () => {

  it('should show validation errors', (done) => {
    const vm = mount(AdCreate)

    vm.find('button').trigger('click')

    // todo   Vue.nextTick(function() {
    setTimeout(function() {
      expect(vm.findAll('.text-danger').length).toBe(4)
      expect(vm.text()).toContain('The title field is required.')
      expect(vm.text()).toContain('The description field is required.')
      expect(vm.text()).toContain('The points field is required.')
      expect(vm.text()).toContain('The location field is required.')
      done()
    }, 0)
  })
})