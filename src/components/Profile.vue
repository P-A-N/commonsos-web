<template>
  <div v-if="user" >
    <app-toolbar title="Profile"/>

    <v-container fluid grid-list-lg mt-3>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card flat>
            <v-layout align-center row>

              <v-flex ml-3 xs2>
                <avatar :userId="user.id"/>
              </v-flex>

              <v-flex my-2>
                <div class="headline">{{user.fullName}}</div>
                <div class="caption" v-if="user.location"><v-icon small>location_on</v-icon>{{user.location}}</div>
              </v-flex>

              <v-flex mr-3 xs1>
                <v-icon>keyboard_arrow_right</v-icon>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container fluid grid-list-lg>
      <v-card flat>
        <v-card-title primary-title>
          <v-layout align-center row>
            <v-flex>
              <span class="headline">Balance</span>
            </v-flex>
            <v-flex class="text-xs-right">
              <span class="title">{{user.balance}}</span>
            </v-flex>
          </v-layout>
        </v-card-title>
      </v-card>
    </v-container>

    <v-container fluid grid-list-lg>
      <v-btn block @click.prevent="">
        Manage my ads
      </v-btn>
    </v-container>

    <v-container v-if="user.admin" fluid grid-list-lg>
      <v-btn class="admin" block to="/search-user">
        Admin: Topup users
      </v-btn>
    </v-container>

    <v-container fluid grid-list-lg>
      <v-btn class="logout" flat color="grey" block @click.prevent="logout()">Logout</v-btn>
    </v-container>
  </div>
</template>

<script>
  import AppToolbar from '@/components/AppToolbar'
  import Avatar from '@/components/Avatar'
  import userService from '@/services/UserService'
  import eventbus from '@/eventbus'

  export default {
    components: {
      AppToolbar, Avatar
    },
    data() {
      return {
        user: userService.user(),
      }
    },
    methods: {
      logout: () => userService.logout(),
      onUserChanged(user) {
        this.user = user
      }
    },
    created() {
      eventbus.$on('userChanged', this.onUserChanged)
    },
    destroyed() {
      eventbus.$off('userChanged', this.onUserChanged)
    }
  }
</script>
