<template>
  <div>
    <app-toolbar :title="counterParty.fullName+' | '+threadTitle">
      <v-btn slot="left" icon @click="$router.back()">
        <v-icon>arrow_back</v-icon>
      </v-btn>
    </app-toolbar>
    <v-list three-line>
      <v-subheader>{{ threadTitle }}</v-subheader>
      <template v-for="message in messages">
        <v-list-tile avatar>
          <v-list-tile-avatar v-if="message.createdBy">
            <img :src="message.createdBy.avatarUrl">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-sub-title v-html="message.text"></v-list-tile-sub-title>
            <v-list-tile-sub-title v-if="message.createdAt" class="grey--text caption">{{message.createdAt | moment('from')}}</v-list-tile-sub-title>
            <v-progress-linear v-else :indeterminate="true"></v-progress-linear>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
      </template>
    </v-list>

    <v-container>
      <v-layout row wrap>
        <v-flex>
          <form @submit.prevent="sendMessage()" fixed bottom>
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
    props: ['threadId'],
    data() {
      return {
        threadTitle: '',
        counterParty: {},
        messages: [],
        messageText: '',
      }
    },
    methods: {
      loadThread() {
        gateway.get(`/message-threads/${this.threadId}`).then(r => {
          this.messages = r.data.messages
          this.counterParty = r.data.users[0]
          this.threadTitle = r.data.title
        })
      },
      sendMessage() {
        gateway.post(`/message-threads/${this.threadId}/messages`, {threadId: this.threadId, text: this.messageText})
        this.messages.push({text: this.messageText})
        this.messageText = ""
      },
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
