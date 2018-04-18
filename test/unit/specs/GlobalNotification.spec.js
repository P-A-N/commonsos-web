import {mount} from '@vue/test-utils'
import VueRouter from 'vue-router'
import GlobalNotification from '@/components/GlobalNotification'

describe('GlobalNotification.vue', () => {
  let wrapper
  let router

  beforeEach(() => {
    router = new VueRouter()
    wrapper = mount(GlobalNotification, {router})
  })

  it('shows error', (done) => {
    wrapper.vm.showMessage('error', 'things got wrong')

    setTimeout(() => {
      expect(wrapper.find('#snackbar').text()).toContain('things got wrong')
      expect(wrapper.vm.timeout).toBe(100000000)
      expect(wrapper.vm.color).toBe('red')
      expect(wrapper.vm.visible).toBe(true)
      done()
    }, 0)
  })

  it('shows info', (done) => {
    wrapper.vm.showMessage('info', 'things are well')

    setTimeout(() => {
      expect(wrapper.find('#snackbar').text()).toContain('things are well')
      expect(wrapper.vm.timeout).toBe(5000)
      expect(wrapper.vm.color).toBe('blue')
      expect(wrapper.vm.visible).toBe(true)
      done()
    }, 0)
  })

  it('hides error notification in case of route change', (done) => {
    wrapper.vm.showMessage('error', 'things are bad')

    setTimeout(() => {
      router.push('/other-route')

      setTimeout(() => {
        expect(wrapper.vm.visible).toBe(false)
        done()
      }, 0)
    }, 0)
  })

  it('can be closed manually', (done) => {
    wrapper.vm.showMessage('info', 'things are well')

    setTimeout(() => {
      wrapper.find('button').trigger('click')

      setTimeout(() => {
        expect(wrapper.vm.visible).toBe(false)
        done()
      }, 0)
    }, 0)
  })
})
