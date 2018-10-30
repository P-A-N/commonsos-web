<template>
  <form>
    <v-card-text>
      <div class="mb-2">
        <v-chip>
          <v-avatar>
            <img :src="owner.avatarUrl">
          </v-avatar>
          {{ owner.username }}
        </v-chip>
        <small>{{$t('EditGroup.owner')}}</small>
      </div>
      <select-group-members :existing-members="thread.parties" :member-selected="memberSelected"></select-group-members>
      <v-text-field v-model="localThread.title" :label="$t('EditGroup.title')" type="text"/>
    </v-card-text>

    <v-card-actions>
      <small style="text-align: right; color: #555; padding-right: 20px;">{{$t('EditGroup.saveHint')}}</small>
      <v-spacer/>
      <v-btn @click="updateGroup()" color="primary" right>
        {{$t('EditGroup.save')}}
      </v-btn>
    </v-card-actions>
  </form>
</template>

<script>
  import gateway from '@/gateway'
  import SelectGroupMembers from '@/components/SelectGroupMembers'
  import LoggedInUserConsumerMixin from '@/LoggedInUserConsumerMixin'

  export default {
    name: 'EditGroup',
    mixins: [LoggedInUserConsumerMixin],
    components: {SelectGroupMembers},
    props: ['closeModal', 'thread'],
    data() {
      return {
        localThread: null
      }
    },
    methods: {
      memberSelected: function(val) {
        this.localThread.parties = val
      },
      updateGroup: function () {
        let memberIds = this.localThread.parties.map(u => u.id)
        let data = {memberIds, title: this.localThread.title}
        gateway.post(`/message-threads/${this.thread.id}/group`, data).then(r => this.closeModal(r.data))
      }
    },
    created() {
      this.localThread = Object.assign({}, this.thread)
      this.owner = this.thread.creator
    }
  }
</script>