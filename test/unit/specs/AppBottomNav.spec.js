import eventbus from '@/eventbus'
import {mount} from '../test-utils'
import AppBottomNav from '@/components/AppBottomNav'

describe('AppBottomNav', () => {

  it('shows number of unread messages', function (done) {
    let wrapper = mount(AppBottomNav)

    eventbus.$emit('unread-messages-count', 3210)

    setTimeout(() => {
      expect(wrapper.find('.badge__badge').text()).toBe('3210')
      done()
    }, 0)
  });

  it('hides badge if all messages are read', function (done) {
    let wrapper = mount(AppBottomNav)

    eventbus.$emit('unread-messages-count', 0)

    setTimeout(() => {
      expect(wrapper.find('.badge__badge').text()).toBe('0')
      done()
    }, 0)
  });

})