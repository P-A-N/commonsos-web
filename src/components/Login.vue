<template>
  <b-form @submit="login">

    <b-form-group label="Email address:" label-for="login">
      <b-form-input
        id="login"
        type="text"
        placeholder="Enter login"
        v-model="userName"
        required></b-form-input>

      <small>
        <a href="#" @click.prevent="userName = 'elderly1'; password = 'secret1'">Elderly1</a> |
        <a href="#" @click.prevent="userName = 'elderly2'; password = 'secret2'">Elderly2</a> |
        <a href="#" @click.prevent="userName = 'worker'; password = 'secret'">Worker</a>
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
  import userService from '@/services/UserService'

  export default {
    name: 'Login',
    data() {
      return {
        userName: '',
        password: ''
      }
    },
    methods: {
      login() {
        userService.login(this.userName, this.password)
      }
    }
  }
</script>