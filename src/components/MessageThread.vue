<template>
  <div>
    <app-toolbar :title="counterParty.fullName">
      <v-btn slot="left" icon @click="$router.back()">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title slot="extension" style="width: 100%;">
        {{thread.title}}
      </v-toolbar-title>
      <div slot="extension">
        <v-btn flat icon small color="grey">
          <v-icon>info</v-icon>
        </v-btn>

      </div>
      <div slot="extension" class="mr-2" v-if="payable">
        <v-btn flat color="primary" @click="makePayment = true"
               style="width: 66px; min-width: 66px;">
          <v-icon class="pr-2">account_balance_wallet</v-icon>
          {{$t('MessageThread.pay')}}
        </v-btn>
      </div>
    </app-toolbar>
    <div class="messages-list pt-3">
      <template v-for="(message, index) in messages">
        <v-layout mb-2 class="message-wrapper"
                  v-bind:class="{
                  me: my(message), them: !my(message),
                  'same-sender-as-previous': index > 0 && messages[index-1].createdBy === message.createdBy,
                  'next-will-also-be-from-this-sender': index < messages.length - 1 && messages[index + 1].createdBy === message.createdBy
                 }">
          <v-flex class="avatar-wrapper">
            <avatar v-if="message.createdBy" :user="userById(message.createdBy)" />
          </v-flex>
          <v-flex class="message-content-wrapper">
            <div class="text-wrapper" v-html="message.text"></div>
            <div v-if="message.createdAt" class="grey--text caption message-time mt-1">{{message.createdAt |
              moment('from')}}
            </div>
            <v-progress-linear v-else :indeterminate="true"></v-progress-linear>
          </v-flex>
        </v-layout>
      </template>
    </div>

    <v-card color="grey" class="chat-text-input" flat>
      <v-card-text style="padding: 0">
              <form @submit.prevent="sendMessage()">
                <v-text-field v-model="messageText" :label="$t('MessageThread.message')"
                              type="text" flat solo rows="2" multi-line autofocus/>
                  <v-btn type="submit" small absolute top right fab color="primary"><v-icon>send</v-icon>
                  </v-btn>
              </form>
      </v-card-text>
    </v-card>
    <div ref="messageInput"></div>

    <modal v-if="makePayment" :title="$t('MessageThread.makePaymentModalTitle')" @close="makePayment = false">
      <make-payment :amount="ad.points" :beneficiary="counterParty" :ad="ad" :description="$t('Payment.description',{title: ad.title})"
                    slot-scope="modal" :closeModal="modal.close"/>
    </modal>
  </div>
</template>

<script>
  import AppToolbar from '@/components/AppToolbar'
  import Avatar from '@/components/Avatar'
  import gateway from '@/gateway'
  import Modal from '@/components/Modal'
  import MakePayment from '@/components/MakePayment'
  import LoggedInUserConsumerMixin from '@/LoggedInUserConsumerMixin'

  export default {
    name: 'MessageThread',
    components: {
      AppToolbar, Avatar, Modal, MakePayment
    },
    mixins: [LoggedInUserConsumerMixin],
    props: ['threadId'],
    beforeRouteEnter(to, from, next) {
      Promise.all([
        gateway.get(`/message-threads/${to.params.threadId}`),
        gateway.get(`/message-threads/${to.params.threadId}/messages`)]
      ).then(values => {
          next(vm => {
            vm.setThread(values[0].data)
            vm.messages = values[1].data
            vm.scrollToEnd()
          })
        })
    },
    data() {
      return {
        ad: null,
        makePayment: false,
        thread: {},
        counterParty: {},
        messages: [],
        messageText: ''
      }
    },
    computed: {
      payable() {
        return this.ad && this.ad.payable;
      }
    },
    methods: {
      setThread(thread) {
        this.thread = thread
        this.counterParty = this.thread.parties[0]
        this.ad = thread.ad
      },
      loadMessages() {
        return gateway.get(`/message-threads/${this.threadId}/messages`).then(r => this.messages = r.data)
      },
      sendMessage() {
        if (this.messageText === "") return
        let newMessage = {text: this.messageText, createdBy: this.user.id, createdAt: null}
        this.messages.push(newMessage)
        let data = {threadId: this.threadId, text: this.messageText}
        gateway.post(`/message-threads/${this.threadId}/messages`, data).then(r => Object.assign(newMessage, r.data))
        this.messageText = ""
        this.scrollToEnd()
      },
      scrollToEnd() {
        this.$nextTick(() => {
          this.$vuetify.goTo(this.$refs.messageInput, {duration: 400})
        })
      },
      my(message) {
        return this.user.id === message.createdBy
      },
      userById(userId) {
        return (userId === this.user.id) ? this.user : this.thread.parties.find(user => user.id === userId)
      },
      pollMessages() {
        this.threadRefresh = setInterval(() => this.loadMessages(), 5000);
      }
    },
    created() {
      this.pollMessages()
    },
    destroyed() {
      clearInterval(this.threadRefresh)
    }
  }
</script>
