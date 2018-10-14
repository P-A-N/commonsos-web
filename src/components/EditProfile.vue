<template>
  <div>
    <app-toolbar :title="$t('EditProfile.title')">
      <v-btn slot="left" icon @click="$router.back()">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <div slot="default" class="mr-0">
        <v-btn flat color="primary" @click.prevent="submitChanges()" class="submit-form">
          <v-icon class="pr-2">check</v-icon>
        </v-btn>
      </div>
    </app-toolbar>

    <form v-on:submit.prevent="submitChanges">
      <v-card-text>
        <v-text-field v-model="localUser.username" :label="$t('EditProfile.username')" type="text"
                      :error-messages="errors.collect('username')"
                      v-validate="'required'"
                      data-vv-name="username"/>

        <v-text-field v-model="localUser.emailAddress" :label="$t('EditProfile.emailAddress')" type="text"
                      :error-messages="errors.collect('emailAddress')"
                      v-validate="'required'"
                      data-vv-name="emailAddress"/>

        <v-text-field v-model="localUser.lastName" :label="$t('EditProfile.lastName')" type="text"
                      :error-messages="errors.collect('lastName')"
                      v-validate="'required'"
                      data-vv-name="lastName"/>

        <v-text-field v-model="localUser.firstName" :label="$t('EditProfile.firstName')" type="text"
                      :error-messages="errors.collect('firstName')"
                      v-validate="'required'"
                      data-vv-name="firstName"/>

        <v-text-field v-model="localUser.description" :label="$t('EditProfile.description')" data-vv-name="description" type="text"/>

        <v-text-field v-model="localUser.location" :label="$t('EditProfile.location')" type="text"/>
        
      </v-card-text>
    </form>
    <v-card-actions style="justify-content: center">
      <v-btn @click="dialog = true" color="red" type="submit" :disabled="loading">{{$t('AdEdit.deleteButton')}}</v-btn>
    </v-card-actions>

    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-text>
          {{ $t('EditProfile.deleteDialog') }}
        </v-card-text>

        <v-card-actions>
          <v-spacer/>

          <v-btn color="blue" flat="flat" @click="dialog = false">
            {{ $t('EditProfile.cancel')}}
          </v-btn>

          <v-btn color="blue darken-1" flat="flat" @click="onDeleteAccount()">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import AppToolbar from '@/components/AppToolbar'
  import gateway from '@/gateway'
  import LoggedInUserConsumerMixin from '@/LoggedInUserConsumerMixin'
  import userService from '@/services/UserService'

  export default {
    name: 'EditProfile',
    mixins: [LoggedInUserConsumerMixin],
    components: {AppToolbar},
    data() {
      return {
        localUser: {},
        loading: false,
        dialog: false,
      }
    },
    methods: {
      submitChanges() {
        this.$validator.validateAll().then((valid) => {
          if (!valid) return
          this.loading = true
          gateway.post(`/users/${this.localUser.id}`, this.localUser)
            .then(r => userService.setUser(r.data))
            .then(() => {
              this.loading = false
              this.$router.back()
            })
        })
      },
      onDeleteAccount() {
        this.dialog = false
        alert('deleting')
      }
    },
    created() {
      this.localUser = {
        id: this.user.id,
        username: this.user.username,
        emailAddress : this.user.emailAddress,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        description: this.user.description,
        location: this.user.location
      }
    }
  }
</script>