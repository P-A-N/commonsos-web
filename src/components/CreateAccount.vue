<template>
  <v-card>

    <v-toolbar app dark color="primary">
      <v-toolbar-title>Create account</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-alert type="error" value="true" v-if="error">{{error}}</v-alert>

    <v-card-text>
      <v-form>
        <v-text-field prepend-icon="person" v-model="user.username" label="Username" type="text"
                      :error-messages="errors.collect('username')"
                      v-validate="'required'"
                      data-vv-name="username"
                      hint="At least 4 characters"
                      min="4"
                      counter="50"/>

        <v-text-field prepend-icon="lock" v-model="user.password" label="Password"
                      :error-messages="errors.collect('password')"
                      hint="At least 8 characters"
                      :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (hidePassword = !hidePassword)"
                      :type="hidePassword ? 'password' : 'text'"
                      counter="50"
                      name="password"
                      v-validate="'required|min:8'"
                      data-vv-name="password"/>

        <v-text-field prepend-icon="lock" v-model="password2" label="Repeat password"
                      :error-messages="errors.collect('password2')"
                      hint="At least 8 characters"
                      :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (hidePassword = !hidePassword)"
                      :type="hidePassword ? 'password' : 'text'"
                      counter="50"
                      v-validate="'required|confirmed:password'"
                      data-vv-name="password2"/>

        <v-text-field v-model="user.firstName" label="First name" type="text"
                      :error-messages="errors.collect('firstName')"
                      v-validate="'required'"
                      data-vv-name="firstName"/>

        <v-text-field v-model="user.lastName" label="Last name" type="text"
                      :error-messages="errors.collect('lastName')"
                      v-validate="'required'"
                      data-vv-name="lastName"/>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <router-link flat to="/login">Login with existing account</router-link>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click.prevent="createAccount()">Create</v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
  import userService from '@/services/UserService'

  export default {
    name: 'Login',
    data() {
      return {
        user:  {
          username: null,
          password: null,
          firstName: null,
          lastName: null,
        },
        password2: null,
        hidePassword: true,
        error: null,
      }
    },
    methods: {
      createAccount() {
        this.error = ''
        this.$validator.validateAll().then((valid) => {
          if (!valid) return
          userService.createAndLogin(this.user).catch(e => this.error = e.key)
        })
      },
      setUser(username, password) {
        this.username = username
        this.password = password
      }
    }
  }
</script>