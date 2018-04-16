<template>
  <div>
    <app-toolbar title="Search user profile">
      <v-btn slot="left" icon to="/profile">
        <v-icon>arrow_back</v-icon>
      </v-btn>
    </app-toolbar>

    <v-container>
      <v-form>
        <v-text-field v-model="filter" @keyup="loadUsers()" label="Enter name" type="text"/>
      </v-form>
    </v-container>

    <v-list v-if="users.length" three-line>
      <template v-for="(user, index) in users">
        <v-list-tile>
          <v-layout align-center row>

            <v-flex xs3>
              <avatar :userId="user.id"/>
            </v-flex>

            <v-flex>
              <div class="headline">{{user.fullName}}</div>
            </v-flex>
          </v-layout>

        </v-list-tile>
        <v-divider v-if="index + 1 < users.length"></v-divider>
      </template>
    </v-list>
  </div>
</template>

<script>
  import AppToolbar from '@/components/AppToolbar'
  import Avatar from '@/components/Avatar'
  import gateway from '@/gateway'

  export default {

    components: {Avatar, AppToolbar},
    data() {
      return {
        filter: null,
        users: []
      }
    },
    methods: {
      loadUsers: function () {
        gateway.get('/users?q=' + encodeURI(this.filter)).then(r => this.users = r.data)
      },
    }
  }
</script>
