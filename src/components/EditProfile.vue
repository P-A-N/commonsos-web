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
        localUser: {}
      }
    },
    methods: {
      submitChanges() {
        this.$validator.validateAll().then((valid) => {
          if (!valid) return
          gateway.post(`/users/${this.localUser.id}`, this.localUser)
            .then(r => userService.setUser(r.data))
            .then(() => this.$router.back())
        })
      }
    },
    created() {
      this.localUser = {
        id: this.user.id,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        description: this.user.description,
        location: this.user.location
      }
    }
  }
</script>