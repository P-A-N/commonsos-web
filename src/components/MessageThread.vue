<template>
  <div>
    <app-toolbar :title="counterParty.fullName">
      <v-btn slot="left" icon @click="$router.back()">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-btn v-if="payable" icon flat @click="makePayment = true">
        {{$t('MessageThread.pay')}}
      </v-btn>
      <v-toolbar-title slot="extension">
        {{thread.title}}
      </v-toolbar-title>
    </app-toolbar>
    <div class="messages-list pt-3">
      <template v-for="(message, index) in messages">
        <v-layout mb-3 class="message-wrapper"
                  v-bind:class="{ me: my(message), them: !my(message) }">
          <v-flex d-flex justify-center class="avatar-wrapper">
            <avatar v-if="message.createdBy" :user="message.createdBy"/>
          </v-flex>
          <v-flex class="message-content-wrapper">
            <div class="text-wrapper mb-1" v-html="message.text"></div>
            <div v-if="message.createdAt" class="grey--text caption">{{message.createdAt | moment('from')}}</div>
            <v-progress-linear height="2" v-else :indeterminate="true"></v-progress-linear>
          </v-flex>
        </v-layout>
      </template>
    </div>

    <v-card color="grey" class="chat-text-input" flat>
      <v-card-text style="padding: 0">
        <form @submit.prevent="sendMessage()">
          <v-text-field v-model="messageText" :label="$t('MessageThread.message')"
                        type="text" flat solo rows="2" multi-line/>
          <v-btn type="submit" small primary absolute top right fab>
            <v-icon>send</v-icon>
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
      loadThread() {
        return gateway.get(`/message-threads/${this.threadId}`).then(r => {
          this.thread = r.data
          this.counterParty = this.thread.parties[0]
          this.messages = r.data.messages
          this.ad = r.data.ad
        })
      },
      sendMessage() {
        if (this.messageText === "") return
        let newMessage = {text: this.messageText, createdBy: this.user, createdAt: null}
        this.messages.push(newMessage)
        gateway.post(`/message-threads/${this.threadId}/messages`, {threadId: this.threadId, text: this.messageText})
          .then(r => Object.assign(newMessage, r.data))
        this.messageText = ""
        this.scrollToEnd()
      },
      scrollToEnd() {
        this.$nextTick(() => {
          this.$vuetify.goTo(this.$refs.messageInput, {duration: 400})
        })
      },
      my(message) {
        return this.user.id === message.createdBy.id
      },
    },
    created() {
      this.loadThread().then(() => this.scrollToEnd())
      this.threadRefresh = setInterval(() => this.loadThread(), 5000);
    },
    destroyed() {
      clearInterval(this.threadRefresh)
    }
  }
</script>
