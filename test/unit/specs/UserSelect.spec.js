import {mount} from '@vue/test-utils'
import UserSelect from '@/components/UserSelect'

describe('UserSelect.vue', () => {

  beforeEach(() => spyOn(window.location, 'reload'))

  it('stores user in local storage', (done) => {
    localStorage.setItem('user', 'elderly')
    const wrapper = mount(UserSelect)

    wrapper.vm.user = 'worker'

    setTimeout(function() {
      expect(localStorage.user).toContain('worker')
      done()
    }, 0)
  })

  afterEach(() => localStorage.clear())
})