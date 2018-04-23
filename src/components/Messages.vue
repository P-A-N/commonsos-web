<template>
  <div>
    <app-toolbar :title="$t('Messages.title')"/>

    <v-list two-line>
      <template v-for="(thread) in messageThreads">
        <v-list-tile avatar @click.prevent="showThread(thread)">
          <v-list-tile-avatar>
            <avatar :user="thread.users[0]"/>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="thread.title"></v-list-tile-title>
            <v-list-tile-sub-title v-html="thread.lastMessage"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider inset="true"></v-divider>
      </template>

    </v-list>

    <app-bottom-nav></app-bottom-nav>

    <modal v-if="currentThread" title="Message thread" @close="currentThread = null">
      <MessageThread :thread="currentThread" slot-scope="modal" :closeModal="modal.close"></MessageThread>
    </modal>

  </div>
</template>

<script>
  import AppToolbar from '@/components/AppToolbar'
  import AppBottomNav from "@/components/AppBottomNav";
  import Avatar from '@/components/Avatar'
  import Modal from '@/components/Modal'
  import MessageThread from '@/components/MessageThread'
  import gateway from '@/gateway'

  export default {
    components: {
      AppToolbar,
      AppBottomNav,
      Avatar,
      Modal,
      MessageThread
    },
    data() {
      return {
        currentThread: null,
        messageThreads: []
      }
    },

    methods: {
      showThread(thread) {
        this.currentThread = thread
      }
    },
    created() {
      gateway.get('/message-threads').then(r => this.messageThreads = r.data)
    }
  }
</script>
