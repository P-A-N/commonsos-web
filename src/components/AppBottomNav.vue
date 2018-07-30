<template>
  <v-bottom-nav fixed :value="true">
    <v-btn flat to="/wallet">
      <span>{{$t('AppBottomNav.wallet')}}</span>
      <v-icon>account_balance_wallet</v-icon>
    </v-btn>
    <v-btn flat to="/community">
      <span>{{$t('AppBottomNav.community')}}</span>
      <v-icon>people</v-icon>
    </v-btn>
    <v-btn flat to="/messages">
      <span>{{$t('AppBottomNav.messages')}}</span>
      <v-badge right v-model="messageCountVisible">
        <span slot="badge">{{messageCount}}</span>
        <v-icon>message</v-icon>
      </v-badge>
    </v-btn>
    <v-btn flat to="/profile">
      <span>{{$t('AppBottomNav.profile')}}</span>
      <v-icon>person</v-icon>
    </v-btn>
    <v-btn flat to="/admin" v-if="user && user.admin">
      <span>{{$t('AppBottomNav.admin')}}</span>
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
      this.renderer = setInterval(() => {this.$forceUpdate()}, 1000);
      this.setCount(MessagePoller.count)
      eventbus.$on('unread-messages-count', this.setCount)
    },
    destroyed() {
      clearInterval(this.renderer);
    }
  }
</script>

<style>
  .bottom-nav .btn {
    min-width: 65px;
  }
</style>