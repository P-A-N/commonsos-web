<template>
  <v-bottom-nav fixed :value="true" app>
    <v-btn to="/wallet">
      <span>Wallet</span>
      <v-icon>account_balance_wallet</v-icon>
    </v-btn>
    <v-btn to="/community">
      <span>Community</span>
      <v-icon>people</v-icon>
    </v-btn>
    <v-btn to="/messages">
      <span>Messages</span>
      <v-badge right v-model="messageCountVisible">
        <span slot="badge">{{messageCount}}</span>
        <v-icon>message</v-icon>
      </v-badge>
    </v-btn>
    <v-btn to="/profile">
      <span>Profile</span>
      <v-icon>person</v-icon>
    </v-btn>
    <v-btn to="/admin" v-if="user && user.admin">
      <span>Admin</span>
      <v-icon>build</v-icon>
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