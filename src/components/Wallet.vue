<template>
  <div>
    <app-toolbar title="Wallet">
    </app-toolbar>

    <v-card flat>
      <v-card-title primary-title>
        <v-layout align-center row>
          <v-flex>
            <span class="headline">Balance</span>
          </v-flex>
          <v-flex class="text-xs-right">
            <span class="title"><v-icon style="vertical-align: bottom">account_balance_wallet</v-icon> {{user ? user.balance : ''}}</span>
          </v-flex>
        </v-layout>
      </v-card-title>
    </v-card>

    <v-divider></v-divider>

    <div v-if="transactions != null">
      <v-list v-if="transactions.length" three-line class="pt-0">
        <template v-for="(transaction, index) in transactions">
          <v-list-tile :key="transaction.title" class="transaction">
            <v-list-tile-avatar>
              <avatar :user="otherPartyUser(transaction)"/>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <div style="width: 100%;">
                <v-layout row justify-space-between>
                  <div class="body-3">
                    {{transaction.debit ? transaction.beneficiary.fullName : transaction.remitter.fullName }}
                  </div>
                  <div class="body-3 text-xs-right" :class="{'debit': transaction.debit, 'credit': !transaction.debit}">
                    {{formattedAmount(transaction)}}
                  </div>
                </v-layout>
                <v-list-tile-sub-title v-html="transaction.description"></v-list-tile-sub-title>
                <div class="caption grey--text">{{transaction.createdAt | moment('from') }}</div>
              </div>
            </v-list-tile-content>

          </v-list-tile>
          <v-divider v-if="index + 1 < transactions.length" inset></v-divider>
        </template>
      </v-list>
      <v-alert v-else type="info" value="true">You don't have any coins yet. You may be eligible for free 2000 coins to use on different services. Contact local municipality to get more information.</v-alert>
    </div>
    <div v-else>Loading....</div>

    <app-bottom-nav></app-bottom-nav>

  </div>
</template>

<script>
  import gateway from '@/gateway'
  import AppToolbar from '@/components/AppToolbar'
  import AppBottomNav from "@/components/AppBottomNav";
  import Avatar from '@/components/Avatar'
  import Modal from '@/components/Modal'
  import LoggedInUserConsumerMixin from '@/LoggedInUserConsumerMixin'

  export default {
    mixins: [LoggedInUserConsumerMixin],
    components: {
      AppToolbar,
      Avatar,
      Modal,
      AppBottomNav
    },
    beforeRouteEnter(to, from, next) {
      gateway.get('transactions').then(r => {next(vm => vm.transactions = r.data)})
    },
    data() {
      return {
        transactions: null,
      }
    },
    methods: {
      onUserChanged(user) {
        this.user = user
      },
      otherPartyUser(transaction) {
        return transaction.debit ? transaction.beneficiary : transaction.remitter
      },
      formattedAmount(transaction) {
        return (transaction.debit ? '-' : '+') + transaction.amount
      }
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