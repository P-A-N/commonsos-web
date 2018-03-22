<template>
  <div>
    <b-navbar class="mb-3" toggleable="md" type="dark" variant="dark">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">Commons OS</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav v-if="user.userName">
          <b-nav-item href="#/ads">Advertisements</b-nav-item>
          <b-nav-item href="#/agreements">Accepted services</b-nav-item>
          <b-nav-item href="#/claim-reward">Claim reward</b-nav-item>
          <b-nav-item href="#" disabled>Chat</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="!user.userName" href="#/login">Login</b-nav-item>
          <b-nav-item v-if="user.userName" href="#" @click.prevent="logout">{{user.userName}} - logout</b-nav-item>
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
      logout: userService.logout
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
