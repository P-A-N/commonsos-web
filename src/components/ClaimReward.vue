<template>
  <v-dialog fullscreen v-model="showDialog" transition="dialog-bottom-transition"
            :overlay="false"
            scrollable>

    <v-card tile>

      <v-toolbar card>
        <v-btn icon @click="closeDialog()">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Claim reward</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <form v-on:submit.prevent="claimReward()">
        <v-card-text>
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
            required/>
        </v-card-text>

        <v-card-actions>
          <v-spacer/>
          <v-btn type="submit" right>Claim reward</v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
  import gateway from '@/gateway'
  import router from '@/router'
  import userService from '@/services/UserService'

  export default {
    data() {
      return {
        showDialog: false,
        code: '',
        error: null,
        transaction: null
      }
    },
    created() {
      setTimeout(() => this.showDialog = true, 0)
    },
    methods: {
      claimReward() {
        gateway.post('/claim-reward', {code: this.code})
          .then(r => {
            this.transaction = r.data
            userService.loadUser()
            router.push('/wallet')
          })
          .catch(message => {
            this.transaction = null
            this.error = message.key
          })
      },
      closeDialog() {
        this.showDialog = false
      }
    }
  }
</script>