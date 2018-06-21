<template>
  <form>
    <v-card-text>
      <select-group-members :existing-members="[]" :member-selected="memberSelected"/>
      <v-text-field v-model="title" :label="$t('CreateGroup.title')" type="text"/>
    </v-card-text>

    <v-card-actions>
      <small style="text-align: right; color: #555; padding-right: 20px;">{{$t('CreateGroup.createHint')}}</small>

      <v-spacer/>

      <v-btn @click="createGroup()" :disabled="!selected.length" color="primary" right>
        {{$t('CreateGroup.create')}}
      </v-btn>
    </v-card-actions>
  </form>
</template>

<script>
  import gateway from '@/gateway'
  import SelectGroupMembers from '@/components/SelectGroupMembers'

  export default {
    name: "CreateGroup",
    props: ['closeModal'],
    components: {SelectGroupMembers},
    data() {
      return {
        title: '',
        users: [],
        filter: '',
        search: null,
        selected: []
      }
    },
    watch: {
      search(val) {
        val && this.loadUsers(val)
      }
    },
    methods: {
      loadUsers: function (query) {
        gateway.get('/users?q=' + encodeURI(query)).then(r => this.users = r.data)
      },
      memberSelected: function(members) {
        this.selected = members
      },
      createGroup: function () {
        let memberIds = this.selected.map(u => u.id)
        gateway.post('/message-threads/group', {memberIds, title: this.title}).then(r => {
          this.closeModal()
          this.$router.push('/messages/' + r.data.id)
        })
      }
    }
  }
</script>