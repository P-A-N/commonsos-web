import {mount} from '@vue/test-utils'
import UserSelect from '@/components/UserSelect'
import router from '@/router'

describe('UserSelect.vue', () => {

  beforeEach(() => {
    spyOn(window.location, 'reload')
    spyOn(router, 'push')
  })

  it('stores user in local storage', (done) => {
    localStorage.setItem('user', 'elderly')
    const wrapper = mount(UserSelect)

    wrapper.vm.user = 'worker'

    setTimeout(function() {
      expect(localStorage.user).toContain('worker')
      expect(router.push).toHaveBeenCalledWith('/')
      done()
    }, 0)
  })

  afterEach(() => localStorage.clear())
})