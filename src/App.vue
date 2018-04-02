<template>
  <v-app>
      <v-content>
        <v-container>
          <router-view/>
        </v-container>
      </v-content>

    <v-bottom-nav v-if="user" fixed :value="true" app>
        <v-btn :to="'/wallet'">
          <span>Wallet</span>
          <v-icon >account_balance_wallet</v-icon>
        </v-btn>
        <v-btn :to="'/community'">
          <span>Community</span>
          <v-icon>people</v-icon>
        </v-btn>
        <v-btn disabled>
          <span>Message</span>
          <v-icon>mail</v-icon>
        </v-btn>
        <v-btn @click.prevent="logout()">
          <span>Logout</span>
          <v-icon>person</v-icon>
        </v-btn>
    </v-bottom-nav>
  </v-app>
</template>

<script>
  import eventbus from '@/eventbus'
  import userService from '@/services/UserService'

  export default {
    data() {
      return {
        user: null
      }
    },
    created() {
      eventbus.$on('userChanged', (user) => this.user = user)
      userService.loadUser()
    },
    methods: {
      logout: () => userService.logout()
    }
  }
</script>

<style>
</style>
