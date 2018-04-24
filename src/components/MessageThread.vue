<template>
  <div>
    <v-list two-line>
      <template v-for="message in messages">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <avatar :user="counterParty.id"/>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{message.createdAt | moment('from')}}</v-list-tile-title>
            <v-list-tile-sub-title v-html="message.text"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
      <v-divider></v-divider>
    </v-list>

    <v-container>
      <v-layout row wrap>
        <v-flex>
          <form @submit.prevent="sendMessage()" fixed bottom>
            <v-chip small>
              {{threadTitle}}
            </v-chip>
            <v-text-field v-model="messageText" :label="$t('MessageThread.message')" type="text" auto-grow multi-line/>
            <v-btn type="submit" color="primary">{{$t('MessageThread.send')}}</v-btn>
          </form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import AppToolbar from '@/components/AppToolbar'
  import Avatar from '@/components/Avatar'
  import gateway from '@/gateway'

  export default {
    name: 'MessageThread',
    components: {
      AppToolbar, Avatar
    },
    props: ['closeModal', 'ad', 'thread'],
    data() {
      return {
        counterParty: [],
        messages: [],
        messageText: '',
        threadTitle: ''
      }
    },
    methods: {
      sendMessage() {
        gateway.post(`/message-threads/${this.thread.id}/messages`, {threadId: this.thread.id, text: this.messageText})
        this.messages.push({text: this.messageText})
        this.messageText = ""
      },
      setThreadData(data) {
        this.messages = data.messages
        this.counterParty = data.users[0]
        this.threadTitle = data.title
      }
    },
    created() {
      if (this.thread) this.setThreadData(this.thread)
      if (this.ad) {
        this.counterParty = this.ad.createdBy
        gateway.post(`/message-threads/for-ad/${this.ad.id}`).then(r => this.setThreadData(r.data))
      }
      this.threadRefresh = setInterval(
        () => gateway.get(`/message-threads/${this.thread.id}`).then(r => this.setThreadData(r.data)), 5000);
    },
    destroyed() {
      clearInterval(this.threadRefresh)
    }
  }
</script>
