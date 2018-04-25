<template>
  <div>
    <app-toolbar :title="$t('Messages.title')"/>

    <v-list two-line>
      <template v-for="(thread) in messageThreads">
        <v-list-tile class="thread" avatar :to="`/messages/${thread.id}`">
          <v-list-tile-avatar>
            <avatar :user="thread.parties[0]"/>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="thread.title"></v-list-tile-title>
            <v-list-tile-sub-title v-if="thread.lastMessage" v-html="thread.lastMessage.text"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>

    </v-list>

    <app-bottom-nav></app-bottom-nav>
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
        messageThreads: []
      }
    },
    created() {
      gateway.get('/message-threads').then(r => this.messageThreads = r.data)
    }
  }
</script>
