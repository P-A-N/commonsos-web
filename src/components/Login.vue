<template>
  <b-form @submit="login">
    <div class="alert alert-danger" v-if="error">{{error}}</div>
    <b-form-group label="Email address:" label-for="login">
      <b-form-input
        id="login"
        type="text"
        placeholder="Enter login"
        v-model="username"
        required></b-form-input>

      <small>Valid users:
        <span v-for="(password, username) in predefinedUsers">
         <a href="#" @click.prevent="setUser(username, password)">{{username}}</a> |
        </span>
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
      showError(message) {
        this.error = message
        setTimeout(()=>this.error = null, 3000)
      },
      login(event) {
        event.preventDefault();
        userService.login(this.username, this.password).catch(e => this.showError('Invalid username or password'))
      },
      setUser(username, password) {
        this.username = username
        this.password = password
      }
    }
  }
</script>