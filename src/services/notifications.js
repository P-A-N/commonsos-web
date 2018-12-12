import eventbus from '@/eventbus'

export default {

  e(message) {
    eventbus.$emit('global-message', {text: message, type: 'error'})
  },

  i(message) {
    eventbus.$emit('global-message', {text: message, type: 'info'})
  }
}
