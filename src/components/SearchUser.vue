<template>
  <div>
    <app-toolbar title="Admin"></app-toolbar>

    <v-subheader>Top-up users</v-subheader>

    <div class="px-3">
      <v-form>
        <v-text-field v-model="filter" @change="loadUsers()" @keyup="loadUsers()" label="Find user by name" type="text"/>
      </v-form>
    </div>

    <v-list v-if="users.length" three-line>
      <template v-for="(user, index) in users">
        <v-list-tile class="user" @click.prevent="showProfile(user)">
          <v-layout align-center row>
            <v-flex xs3>
              <avatar :user="user"/>
            </v-flex>

            <v-flex>
              <div class="title">{{user.username}}</div>
            </v-flex>

            <v-flex mr-3 xs1>
              <v-icon>keyboard_arrow_right</v-icon>
            </v-flex>
          </v-layout>

        </v-list-tile>
        <v-divider v-if="index + 1 < users.length"></v-divider>
      </template>
    </v-list>

    <app-bottom-nav></app-bottom-nav>

  </div>
</template>

<script>
  import AppToolbar from '@/components/AppToolbar'
  import AppBottomNav from '@/components/AppBottomNav'
  import Avatar from '@/components/Avatar'
  import gateway from '@/gateway'

  export default {

    components: {
      Avatar,
      AppToolbar,
      AppBottomNav
    },
    data() {
      return {
        filter: null,
        users: [],
        debounceTimer: null
      }
    },
    methods: {
      loadUsers: function () {
        clearTimeout(this.debounceTimer)
        this.debounceTimer = setTimeout(() => gateway.get('/users?q=' + encodeURI(this.filter)).then(r => this.users = r.data), 300)
      },
      showProfile: function(user) {
        this.$router.push('/profile/'+user.id);
      }
    }
  }
</script>
