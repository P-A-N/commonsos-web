<template>
  <div>
    <b-navbar class="mb-3" toggleable="md" type="dark" variant="dark">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">Commons OS</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav v-if="isLoggedIn()">
          <b-nav-item href="#/ads">Advertisements</b-nav-item>
          <b-nav-item href="#/agreements">Accepted services</b-nav-item>
          <b-nav-item href="#/claim-reward">Claim reward</b-nav-item>
          <b-nav-item href="#/transactions">Transaction history</b-nav-item>
          <b-nav-item href="#" disabled>Chat</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="!isLoggedIn()" href="#/login">Login</b-nav-item>
          <template v-else>
            <b-nav-text class="mt-2 mr-2">
              <b-badge variant="secondary">{{user.balance}} points</b-badge>
            </b-nav-text>
            <b-nav-text class="mt-2">
              <span class="text-white">{{user.username}}</span>
            </b-nav-text>
            <b-nav-item @click.prevent="logout()" class="mt-1">
              <icon name="sign-out" scale="1.8"></icon>
            </b-nav-item>
          </template>

        </b-navbar-nav>

      </b-collapse>
    </b-navbar>

    <main role="main" class="container">
      <router-view/>
    </main>
  </div>
</template>

<script>
  import eventbus from '@/eventbus'
  import userService from '@/services/UserService'

  export default {
    name: 'App',
    data() {
      return {
        user: userService.user()
      }
    },
    created() {
      eventbus.$on('login', (user) => this.user = user)
      eventbus.$on('logout', () => this.user = {})
    },
    methods: {
      isLoggedIn: () => userService.isLoggedIn(),
      logout: () => userService.logout()
    },
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
