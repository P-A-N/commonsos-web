<template>
  <div>
    <app-toolbar title="Wallet"></app-toolbar>

    <v-card flat>
      <v-card-title primary-title>
        <v-layout align-center row>
          <v-flex>
            <span class="headline">Balance</span>
          </v-flex>
          <v-flex class="text-xs-right">
            <span class="title">{{user ? user.balance : ''}}</span>
          </v-flex>
        </v-layout>
      </v-card-title>
    </v-card>

    <v-divider></v-divider>

    <v-list v-if="transactions.length" three-line>
      <template v-for="(transaction, index) in transactions">
        <v-list-tile :key="transaction.title" class="transaction">
          <v-layout align-center row>

            <v-flex xs3>
              <avatar :userId="otherPartyUserId(transaction)"/>
            </v-flex>

            <v-flex>
              <div class="">from {{transaction.remitterId}} to {{transaction.beneficiaryId}}</div>
              <div class="caption">{{transaction.createdAt | moment('from') }}</div>
            </v-flex>

            <v-flex xs2 class="body-3 text-xs-right" :class="{'debit': isDebit(transaction), 'credit': !isDebit(transaction)}">
              {{formattedAmount(transaction)}}
            </v-flex>
          </v-layout>

        </v-list-tile>
        <v-divider v-if="index + 1 < transactions.length"></v-divider>
      </template>
    </v-list>
    <v-alert v-else type="info" value="true">No transactions</v-alert>
  </div>
</template>

<script>
  import gateway from '@/gateway'
  import eventbus from '@/eventbus'
  import AppToolbar from '@/components/AppToolbar'
  import Avatar from '@/components/Avatar'
  import userService from '@/services/UserService'

  export default {
    components: {AppToolbar, Avatar},
    data() {
      return {
        user: userService.user(),
        transactions: []
      }
    },
    methods: {
      onUserChanged(user) {
        this.user = user
      },
      otherPartyUserId(transaction) {
        return transaction.remitterId === this.user.id ? transaction.remitterId : transaction.beneficiaryId
      },
      isDebit(transaction) {
        return transaction.remitterId === this.user.id
      },
      formattedAmount(transaction) {
        return (this.isDebit(transaction) ? '-' : '+') + transaction.amount
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
<style scoped>
  .debit {
    color: red
  }
  .credit {
    color: green;
  }
</style>