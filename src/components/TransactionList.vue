<template>
  <div>

    <app-toolbar title="Wallet"></app-toolbar>

    <div v-if="user">
      Balance {{user.balance}}
    </div>
    <v-list v-if="transactions.length" three-line>
      <template v-for="(transaction, index) in transactions">
        <v-list-tile :key="transaction.title">
          <v-list-tile-content>
            <v-list-tile-title>{{transaction.amount}} points</v-list-tile-title>
            <v-list-tile-sub-title>{{transaction.createdAt | moment('from') }} from <b>{{transaction.remitterId}}</b> to <b>{{transaction.beneficiaryId}}</b></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider v-if="index + 1 < transactions.length" ></v-divider>
      </template>
    </v-list>
    <v-alert v-else type="info" value="true">No transactions</v-alert>
  </div>
</template>

<script>
  import gateway from '@/gateway'
  import eventbus from '@/eventbus'
  import AppToolbar from '@/components/AppToolbar'
  import userService from '@/services/UserService'

  export default {
    components: {
      AppToolbar
    },
    data() {
      return {
        user: userService.user(),
        transactions: []
      }
    },
    methods: {
      onUserChanged(user) {
        this.user = user
      }
    },
    created() {
      eventbus.$on('userChanged', this.onUserChanged)
      gateway.get('transactions').then(r => this.transactions = r.data)
    },
    destroyed() {
      eventbus.$off('userChanged', this.onUserChanged)
    }
  }
</script>