<template>
  <div>
    <app-toolbar :title="$t('Messages.title')">
      <v-btn slot="default" icon @click="startCreatingGroupChat()">
        <v-icon>add</v-icon>
      </v-btn>
    </app-toolbar>

    <v-list three-line>
      <template v-for="(thread, index) in messageThreads">
        <v-list-tile class="thread" avatar :to="`/messages/${thread.id}`">
          <v-list-tile-avatar>
            <avatar :user="thread.parties[0]"/>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>
              <span :class="{'unread': thread.unread}">{{thread.title}}</span>
            </v-list-tile-title>
            <v-list-tile-sub-title v-if="thread.lastMessage" style="line-height: 1.3;"><span class="text--primary">{{thread.parties[0].fullName}}</span> &ndash; {{thread.lastMessage.text}}</v-list-tile-sub-title>
            <div class="caption grey--text" v-if="thread.lastMessage">{{thread.lastMessage.createdAt | moment('from') }}</div>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider v-if="index + 1 < messageThreads.length" inset></v-divider>
      </template>

    </v-list>

    <app-bottom-nav/>

    <modal v-if="createGroupChatOptions" :title="$t('Messages.createGroupModalTitle')" @close="groupCreated()">
      <create-group slot-scope="modal" :closeModal="modal.close"/>
    </modal>

  </div>
</template>

<script>
  import AppToolbar from '@/components/AppToolbar'
  import AppBottomNav from "@/components/AppBottomNav";
  import Avatar from '@/components/Avatar'
  import Modal from '@/components/Modal'
  import MessageThread from '@/components/MessageThread'
  import CreateGroup from '@/components/CreateGroup'
  import gateway from '@/gateway'
  import messagePoller from '@/services/MessagePoller'

  export default {
    components: {
      AppToolbar,
      AppBottomNav,
      Avatar,
      Modal,
      MessageThread,
      CreateGroup
    },
    data() {
      return {
        messageThreads: [],
        createGroupChatOptions: false
      }
    },
    methods: {
      startCreatingGroupChat() {
        console.log("startCreatingGroupChat")
        this.createGroupChatOptions = true
      },
      groupCreated() {
        console.log("groupCreated")
        this.createGroupChatOptions = false
      }
    },
    created() {
      messagePoller.checkForUnreadThreads()
      gateway.get('/message-threads').then(r => this.messageThreads = r.data)
    }
  }
</script>

<style scoped>
  .unread {
    font-weight: bold;
  }
</style>