<template>
  <form v-on:submit.prevent="claimReward()">

    <v-alert type="error" value="true" v-if="error">
      {{error}}
    </v-alert>

    <v-alert type="success" value="true" v-if="transaction">
      You have successfully claimed your reward of {{transaction.amount}} points!
    </v-alert>

    <v-text-field
      v-model="code"
      label="Enter reward code"
      :error-messages="errors.collect('code')"
      v-validate="'required'"
      data-vv-name="code"
      required
    ></v-text-field>

    <v-btn type="submit" class="btn btn-primary">Claim reward</v-btn>

  </form>
</template>

<script>
  import gateway from '@/gateway'
  import userService from '@/services/UserService'

  export default {
    data() {
      return {
        code: '',
        error: null,
        transaction: null
      }
    },
    methods: {
      claimReward() {
        gateway.post('/claim-reward', {code: this.code})
          .then(r => {
            this.transaction = r.data
            userService.loadUser()
          })
          .catch(message => {
            this.transaction = null
            this.error = message.key
          })
      }
    }
  }
</script>