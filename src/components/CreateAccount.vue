<template>
  <v-card style="height: auto">

    <v-toolbar app dark color="primary">
      <v-btn icon to="/login" :disabled="loading">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>{{$t('CreateAccount.title')}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.prevent="createAccount()" :disabled="loading">
        <v-icon>check</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card-text>
    <v-form>
        <v-text-field prepend-icon="person" v-model="user.username" :label="$t('CreateAccount.username')" type="text"
                      :error-messages="errors.collect('username')"
                      v-validate="'required|min:4'"
                      data-vv-name="username"
                      :hint="$t('CreateAccount.usernameHint')"
                      min="4"
                      counter="50"/>

        <v-text-field prepend-icon="lock" v-model="user.password" :label="$t('CreateAccount.password')"
                      :error-messages="errors.collect('password')"
                      :hint="$t('CreateAccount.passwordHint')"
                      :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (hidePassword = !hidePassword)"
                      :type="hidePassword ? 'password' : 'text'"
                      counter="50"
                      name="password"
                      v-validate="'required|min:8'"
                      data-vv-name="password"/>

        <v-text-field prepend-icon="lock" v-model="password2" :label="$t('CreateAccount.password2')"
                      :error-messages="errors.collect('password2')"
                      :hint="$t('CreateAccount.password2Hint')"
                      :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (hidePassword = !hidePassword)"
                      :type="hidePassword ? 'password' : 'text'"
                      counter="50"
                      v-validate="'required|confirmed:password'"
                      data-vv-name="password2"/>

        <v-text-field v-model="user.lastName" :label="$t('CreateAccount.lastName')" type="text"
                      :error-messages="errors.collect('lastName')"
                      v-validate="'required'"
                      data-vv-name="lastName"/>

        <v-text-field v-model="user.firstName" :label="$t('CreateAccount.firstName')" type="text"
                      :error-messages="errors.collect('firstName')"
                      v-validate="'required'"
                      data-vv-name="firstName"/>

        <v-text-field v-model="user.description" :label="$t('CreateAccount.description')" type="text"/>

        <v-select
          :items="communities"
          v-model="user.communityId"
          item-text="name"
          item-value="id"
          :label="$t('CreateAccount.community')"
          single-line
          :error-messages="errors.collect('community')"
          v-validate="'required'"
          data-vv-name="community"
        ></v-select>

        <vuetify-google-autocomplete
          id="map"
          append-icon="search"
          :placeholder="$t('CreateAccount.location')"
          country="jp"
          types="(cities)"
          v-model="user.location"/>
      </v-form>

      </v-card-text>

      <v-card-actions class="pb-5 pr-3">
        <small style="text-align: right; color: #555">{{$t('CreateAccount.createHint')}}</small>
        <v-spacer/>
        <v-btn color="primary" @click.prevent="createAccount()" :disabled="loading">
            {{$t('CreateAccount.createButton')}}
        </v-btn>
      </v-card-actions>

  </v-card>
</template>

<script>
  import userService from '@/services/UserService'
  import notifications from '@/services/notifications'
  import gateway from '@/gateway'

  export default {
    name: 'CreateAccount',
    data() {
      return {
        loading: false,
        communities: [],
        user: {
          username: null,
          password: null,
          firstName: null,
          lastName: null,
          description: null,
          location: null,
          communityId: null
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
          this.loading = true
          userService.createAndLogin(this.user)
            .then(() => notifications.i('Welcome to Community OS'))
            .catch(() => this.loading = false)
        })
      },
      setUser(username, password) {
        this.username = username
        this.password = password
      }
    },
    created() {
      gateway.get('/communities').then(r => {
        this.communities = r.data
        if (this.communities.length === 1) this.user.communityId = this.communities[0].id;
      });
    }
  }
</script>