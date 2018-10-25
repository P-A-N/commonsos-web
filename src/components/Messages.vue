<template>
  <div>
    <app-toolbar :title="$t('Messages.title')">
      <v-btn slot="default" icon @click="createGroupChatOptions = true">
        <v-icon>add</v-icon>
      </v-btn>
    </app-toolbar>

    <v-list three-line v-if="messageThreads.length">
      <template v-for="(thread, index) in messageThreads">
        <v-list-tile class="thread" avatar :to="`/messages/${thread.id}`">
          <v-list-tile-avatar>
            <avatar :user="thread.counterParty" v-if="!thread.group"/>
            <group-avatar :users="thread.parties.concat([thread.creator])" v-if="thread.group"/>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>
              <span :class="{'unread': thread.unread}">{{thread.title}}</span>
            </v-list-tile-title>
            <v-list-tile-sub-title style="line-height: 1.3;">
              <span v-if="thread.lastMessage">
                <span class="text--primary">{{userById(thread, thread.lastMessage.createdBy).username}}</span> &ndash; {{thread.lastMessage.text}}
              </span>
              <span v-else class="caption grey--text">{{$t('Messages.noMessagesInThread')}}</span>
            </v-list-tile-sub-title>
            <div class="caption grey--text" v-if="thread.lastMessage">{{thread.lastMessage.createdAt | moment('from') }}</div>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider v-if="index + 1 < messageThreads.length" inset></v-divider>
      </template>
    </v-list>
    <v-alert v-else type="info" value="true">{{$t('Messages.noMessageThreads')}}</v-alert>

    <app-bottom-nav></app-bottom-nav>

    <modal v-if="createGroupChatOptions" :title="$t('Messages.createGroupModalTitle')" @close="createGroupChatOptions = false">
      <create-group slot-scope="modal" :closeModal="modal.close"/>
    </modal>

  </div>
</template>

<script>
  import AppToolbar from '@/components/AppToolbar'
  import AppBottomNav from "@/components/AppBottomNav";
  import Avatar from '@/components/Avatar'
  import GroupAvatar from '@/components/GroupAvatar'
  import Modal from '@/components/Modal'
  import MessageThread from '@/components/MessageThread'
  import CreateGroup from '@/components/CreateGroup'
  import gateway from '@/gateway'
  import messagePoller from '@/services/MessagePoller'

  export default {
    components: {AppToolbar, AppBottomNav, Avatar, GroupAvatar, Modal, MessageThread, CreateGroup},
    data() {
      return {
        messageThreads: [],
        createGroupChatOptions: false
      }
    },
    beforeRouteEnter(to, from, next) {
      gateway.get('/message-threads').then(r => {next(vm => vm.messageThreads = r.data)})
    },
    created() {
      messagePoller.checkForUnreadThreads()
    },
    methods: {
      userById(thread, userId) {
        return (userId === thread.creator.id) ? thread.creator : thread.parties.find(user => user.id === userId)
      }
    },
  }
</script>

<style scoped>
  .unread {
    font-weight: bold;
  }
</style>