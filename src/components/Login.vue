<template>
  <v-card>

    <v-toolbar app dark color="primary">
      <v-toolbar-title>Please log in</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-alert type="error" value="true" v-if="error">{{error}}</v-alert>

    <v-card-text>
      <v-form>
        <v-text-field prepend-icon="person" v-model="username" label="Username" type="text"
                      :error-messages="errors.collect('username')"
                      v-validate="'required'"
                      data-vv-name="username"/>
        <v-text-field prepend-icon="lock" v-model="password" label="Password" type="password"
                      :error-messages="errors.collect('password')"
                      v-validate="'required'"
                      data-vv-name="password"/>
      </v-form>
      <small>Valid users:
        <span v-for="(password, username) in predefinedUsers">
          <a href="#" @click.prevent="setUser(username, password)">{{username}}</a> |
        </span>
      </small>
    </v-card-text>

    <v-card-actions>
      <router-link flat to="/create-account">Create account</router-link>
        <v-spacer></v-spacer>
      <v-btn color="primary" @click.prevent="login()">Login</v-btn>
    </v-card-actions>
  </v-card>

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
          worker: 'secret00',
          elderly1: 'secret00',
          elderly2: 'secret00'
        }
      }
    },
    methods: {
      login() {
        this.$validator.validateAll().then((valid) => {
          if (!valid) return
          userService.login(this.username, this.password).catch(e => this.error = 'Invalid username or password')
        })
      },
      setUser(username, password) {
        this.username = username
        this.password = password
      }
    }
  }
</script>