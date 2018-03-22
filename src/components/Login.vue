<template>
  <b-form @submit="login">

    <b-form-group label="Email address:" label-for="username">
      <b-form-input
        id="username"
        type="text"
        placeholder="Enter username"
        v-model="username"
        required></b-form-input>

      <small>
        <a href="#" @click.prevent="username = 'elderly1'; password = 'secret1'">Elderly1</a> |
        <a href="#" @click.prevent="username = 'elderly2'; password = 'secret2'">Elderly2</a> |
        <a href="#" @click.prevent="username = 'worker'; password = 'secret'">Worker</a>
      </small>
    </b-form-group>

    <b-form-group label="Password:" label-for="password">
      <b-form-input
        id="password"
        type="password"
        placeholder="Enter password"
        v-model="password"
        required>
      </b-form-input>
    </b-form-group>

    <b-button type="submit" variant="primary">Login</b-button>

  </b-form>
</template>

<script>
  import router from '@/router'
  import eventbus from '@/eventbus'

  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login() {
        localStorage.user = this.username
        eventbus.$emit('login', {username: this.username})
        router.push('/')
      }
    }
  }
</script>