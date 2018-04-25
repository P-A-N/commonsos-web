<template>
  <div>
    <app-toolbar v-if="thread.parties" :title="thread.parties[0].fullName">
      <v-btn slot="left" icon @click="$router.back()">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title slot="extension">{{thread.title}}</v-toolbar-title>
    </app-toolbar>
    <div class="messages-list pt-3">

      <template v-for="(message, index) in messages">
        <v-layout mb-2 class="message-wrapper"
                  v-bind:class="{
                  me: user.id === message.createdBy.id,
                  them: user.id !== message.createdBy.id,
                  'same-sender-as-previous': index > 0 && messages[index-1].createdBy.id === message.createdBy.id,
                  'next-will-also-be-from-this-sender': index < messages.length - 1 && messages[index + 1].createdBy.id === message.createdBy.id
                 }">
          <v-flex class="avatar-wrapper">
            <avatar v-if="message.createdBy" :user="message.createdBy" />
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
                              type="text" flat solo rows="2" multi-line/>
                  <v-btn type="submit" small absolute top right fab color="primary"><v-icon>send</v-icon>
                  </v-btn>
              </form>
      </v-card-text>
    </v-card>
    <div ref="messageInput"></div>
  </div>
</template>

<script>
  import AppToolbar from '@/components/AppToolbar'
  import Avatar from '@/components/Avatar'
  import gateway from '@/gateway'
  import LoggedInUserConsumerMixin from '@/LoggedInUserConsumerMixin'

  export default {
    name: 'MessageThread',
    components: {
      AppToolbar, Avatar
    },
    mixins: [LoggedInUserConsumerMixin],
    props: ['threadId'],
    data() {
      return {
        thread: {},
        messages: [],
        messageText: ''
      }
    },
    methods: {
      loadThread() {
        gateway.get(`/message-threads/${this.threadId}`).then(r => {
          this.thread = r.data
          this.messages = r.data.messages
          this.scrollToEnd()
        })
      },
      sendMessage() {
        if (this.messageText === "") return
        let newMessage = {text: this.messageText, createdAt: null}
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
      }
    },
    created() {
      this.loadThread()
      this.threadRefresh = setInterval(() => this.loadThread(), 5000);
    },
    destroyed() {
      clearInterval(this.threadRefresh)
    }
  }
</script>
