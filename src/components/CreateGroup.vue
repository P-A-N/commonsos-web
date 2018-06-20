<template>

  <form>
    <v-card-text>
      <v-select
        :items="users"
        :rules="[() => selected.length > 0 || $t('CreateGroup.noMembersSelected')]"
        :search-input.sync="search"
        v-model="selected"

        chips
        deletable-chips

        item-text="fullName"
        item-value="id"

        return-object

        :label="$t('CreateGroup.selectMembers')"
        autocomplete
        multiple
        cache-items
      >

        <template slot="selection" slot-scope="data">
          <v-chip
            :selected="data.selected"
            :key="JSON.stringify(data.item)"
            close
            class="chip--select-multi"
            @input="data.parent.selectItem(data.item)">

            <v-avatar>
              <img :src="data.item.avatarUrl">
            </v-avatar>
            {{ data.item.fullName }}
          </v-chip>
        </template>

        <template slot="item" slot-scope="data">
          <template v-if="typeof data.item !== 'object'">
            {{$t('CreateGroup.searchResultEmpty')}}
          </template>
          <template v-else>
            <v-list-tile-avatar>
              <img :src="data.item.avatarUrl">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="data.item.fullName"></v-list-tile-title>
            </v-list-tile-content>
          </template>
        </template>
      </v-select>

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

  export default {
    name: "CreateGroup",
    props: ['closeModal'],
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