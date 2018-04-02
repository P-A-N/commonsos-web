<template>
  <form @submit="login">
    <div class="alert alert-danger" v-if="error">{{error}}</div>
    <label for="login">
      Email address:
      <input
        id="login"
        type="text"
        placeholder="Enter login"
        v-model="username"
        required>

      <small>Valid users:
        <span v-for="(password, username) in predefinedUsers">
         <a href="#" @click.prevent="setUser(username, password)">{{username}}</a> |
        </span>
      </small>
    </label>

    <label for="password">Password:
      <input
        id="password"
        type="password"
        placeholder="Enter password"
        v-model="password"
        required>
    </label>

    <button type="submit" variant="primary">Login</button>
  </form>
</template>

<script>
  import userService from '@/services/UserService'

  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
        error: null,
        predefinedUsers: {
          worker: 'secret',
          elderly1: 'secret1',
          elderly2: 'secret2'
        }
      }
    },
    methods: {
      login(event) {
        event.preventDefault()
        userService.login(this.username, this.password).catch(e => this.error = 'Invalid username or password')
      },
      setUser(username, password) {
        this.username = username
        this.password = password
      }
    }
  }
</script>