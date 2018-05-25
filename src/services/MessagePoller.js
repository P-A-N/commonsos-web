import gateway from '@/gateway'
import eventbus from '@/eventbus'

export default {

  interval: undefined,

  count: 0,

  checkForUnreadThreads() {
    gateway.get('/message-threads/unread-count', {noLoader: true}).then(r => {
      this.count = r.data.count;
      eventbus.$emit('unread-messages-count', this.count)
    })
  },

  start() {
    this.checkForUnreadThreads()
    this.interval = setInterval(() => this.checkForUnreadThreads(), 30000)
  },

  stop() {
    clearInterval(this.interval)
  }
}