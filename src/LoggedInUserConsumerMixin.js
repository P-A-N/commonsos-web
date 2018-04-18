import userService from '@/services/UserService'
import eventbus from '@/eventbus'

export default {
  data() {
    return {
      user: userService.user()
    }
  },

  methods: {
    onUserChanged(user) {
      this.user = user
    }
  },

  created() {
    eventbus.$on('userChanged', this.onUserChanged)
  },

  destroyed() {
    eventbus.$off('userChanged', this.onUserChanged)
  }
}