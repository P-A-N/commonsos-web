<template>
  <v-bottom-nav fixed :value="true" app>
    <v-btn to="/wallet">
      <v-icon>account_balance_wallet</v-icon>
      <span>Wallet</span>
    </v-btn>
    <v-btn to="/community">
      <v-icon>people</v-icon>
      <span>Community</span>
    </v-btn>
    <v-btn to="/messages">
      <span>Messages</span>
      <v-badge right v-model="messageCountVisible">
        <span slot="badge">{{messageCount}}</span>
        <v-icon>message</v-icon>
      </v-badge>
    </v-btn>
    <v-btn to="/profile">
      <v-icon>person</v-icon>
      <span>Profile</span>
    </v-btn>
    <v-btn to="/admin" v-if="user && user.admin">
      <v-icon>build</v-icon>
      <span>Admin</span>
    </v-btn>
  </v-bottom-nav>
</template>

<script>
  import LoggedInUserConsumerMixin from '@/LoggedInUserConsumerMixin'
  import eventbus from '@/eventbus'
  import MessagePoller from '@/services/MessagePoller'

  export default {
    mixins: [LoggedInUserConsumerMixin],
    props: ['title'],
    data() {
      return {
        messageCount: 0,
        messageCountVisible: false
      }
    },
    methods: {
      setCount(value) {
        this.messageCount = value
        this.messageCountVisible = value > 0
      }
    },
    created() {
      this.setCount(MessagePoller.count)
      eventbus.$on('unread-messages-count', this.setCount)
    }
  }
</script>

<style>
  .bottom-nav .btn {
    min-width: 65px;
  }
</style>