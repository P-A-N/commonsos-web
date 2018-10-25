<template>
  <form v-on:submit.prevent="makePayment()">
    <v-card-text>
      <v-text-field name="description" v-model="transaction.description" label="Description" type="text"
                    :error-messages="errors.collect('description')"
                    v-validate="'required'"
                    data-vv-name="description"/>
      <v-text-field name="amount" v-model="transaction.amount" label="Amount" type="text"
                    :error-messages="errors.collect('amount')"
                    v-validate="'required|decimal'"
                    data-vv-name="amount"/>
      <v-text-field name="beneficiary" v-model="beneficiary.username" label="Beneficiary" type="text" readonly/>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn class="submit-btn" right type="submit" color="primary" :disabled="loading">Make payment</v-btn>
    </v-card-actions>
  </form>
</template>

<script>
  import gateway from '@/gateway'
  import userService from '@/services/UserService'
  import notifications from '@/services/notifications'

  export default {
    props: ['closeModal', 'communityId', 'adId', 'description', 'amount', 'beneficiary', 'user'],
    name: 'MakePayment',
    data() {
      return {
        loading: false,
        transaction: {
          communityId: this.communityId,
          adId: this.adId,
          description: this.description,
          amount: this.amount,
          beneficiaryId: this.beneficiary.id,
          userId: this.user.id,
          username: this.user.username
        }
      }
    },
    methods: {
      makePayment() {
        this.$validator.validateAll().then((valid) => {
          if (!valid) return
          if (!confirm(`Transfer ${this.transaction.amount} coins to ${this.beneficiary.username}?`)) return
          // if (this.ad) this.transaction.adId = this.ad.id
          this.loading = true
          gateway.post('/transactions', this.transaction)
            .then(() => {
              userService.loadUser()
              notifications.i(`Transfered ${this.transaction.amount} coins to ${this.beneficiary.username}`)
              this.closeModal()
            })
            .catch((e) => {
              this.loading = false
            })
        })
      }
    }
  }
</script>