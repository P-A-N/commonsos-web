<template>
  <div>
    <app-toolbar title="Wallet">
      <v-btn icon @click="showClaimReward = true" v-if="false">
        <v-icon>photo_camera</v-icon>
      </v-btn>
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
      <v-list v-if="transactions.length" three-line>
        <template v-for="(transaction, index) in transactions">
          <v-list-tile :key="transaction.title" class="transaction">
            <v-layout align-center row>

              <v-flex xs3>
                <avatar :user="otherPartyUser(transaction)"/>
              </v-flex>

              <v-flex>
                <div class="body-2">
                  {{transaction.debit ? transaction.beneficiary.fullName : transaction.remitter.fullName }}
                </div>
                <div class="body-1">{{transaction.description || 'Ad: [Ad title]'}}</div>
                <div class="caption">{{transaction.createdAt | moment('from') }}</div>
              </v-flex>

              <v-flex xs3 class="body-3 text-xs-right" :class="{'debit': transaction.debit, 'credit': !transaction.debit}">
                {{formattedAmount(transaction)}}
              </v-flex>
            </v-layout>

          </v-list-tile>
          <v-divider v-if="index + 1 < transactions.length"></v-divider>
        </template>
      </v-list>
      <v-alert v-else type="info" value="true">You don't have any coins yet. You may be eligible for free 2000 coins to use on different services. Contact local municipality to get more information.</v-alert>
    </div>
    <div v-else>Loading....</div>

    <modal v-if="showClaimReward" @close="showClaimReward = false" title="Claim reward">
      <claim-reward slot-scope="modal" :closeModal="modal.close"/>
    </modal>

    <app-bottom-nav></app-bottom-nav>

  </div>
</template>

<script>
  import gateway from '@/gateway'
  import AppToolbar from '@/components/AppToolbar'
  import AppBottomNav from "@/components/AppBottomNav";
  import Avatar from '@/components/Avatar'
  import Modal from '@/components/Modal'
  import ClaimReward from '@/components/ClaimReward'
  import LoggedInUserConsumerMixin from '@/LoggedInUserConsumerMixin'

  export default {
    mixins: [LoggedInUserConsumerMixin],
    components: {
      AppToolbar,
      Avatar,
      Modal,
      ClaimReward,
      AppBottomNav
    },
    data() {
      return {
        transactions: null,
        showClaimReward: false
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
    },
    created() {
      gateway.get('transactions').then(r => this.transactions = r.data)
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