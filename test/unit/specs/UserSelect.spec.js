import {mount} from '@vue/test-utils'
import UserSelect from '@/components/UserSelect'

describe('UserSelect.vue', () => {

  it('stores user in local storage', (done) => {
    const wrapper = mount(UserSelect)

    wrapper.vm.user = 'worker'

    setTimeout(function() {
      expect(localStorage.user).toContain('worker')
      done()
    }, 0)
  })

  afterEach(() => localStorage.clear())
})