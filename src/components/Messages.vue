<template>
  <div>
    <app-toolbar title="Messages">
      <v-btn slot="default" icon @click.prevent="">
        <v-icon>add</v-icon>
      </v-btn>
    </app-toolbar>

    <v-list two-line>
      <template v-for="(item, index) in messageThreads">
        <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
        <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
        <v-list-tile avatar v-else @click="" @click.prevent="showThread(item)">
          <v-list-tile-avatar>
            <avatar :user="item.user"/>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="item.title"></v-list-tile-title>
            <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
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
        messageThreads: [
          {header: 'Recent chats'},
          {
            title: 'About tomorrows cleaning',
            subtitle: 'Cleaning service',
            user: {
              id: 1,
              fullName: 'Yuki',
              avatarUrl: 'https://image.jimcdn.com/app/cms/image/transf/none/path/s09a03e3ad80f8a02/image/i788e42d25ed4115e/version/1493969515/image.jpg'
            }
          },
          {divider: true, inset: true},
          {
            title: 'See you tomorrow!',
            subtitle: 'Need more potatos',
            user: {
              id: 1,
              fullName: 'Yuki',
              avatarUrl: 'https://image.jimcdn.com/app/cms/image/transf/none/path/s09a03e3ad80f8a02/image/i788e42d25ed4115e/version/1493969515/image.jpg'
            }
          },
          {divider: true, inset: true},
          {
            title: 'Good to have mutual understanding',
            subtitle: 'Nice service',
            user: {
              id: 2,
              fullName: 'Worker',
              avatarUrl: 'https://qph.fs.quoracdn.net/main-qimg-42b85e5f162e21ce346da83e8fa569bd-c'
            }
          },
        ]
      }
    },

    methods: {
      showThread(thread) {
        this.currentThread = thread
      }
    },
  }
</script>
