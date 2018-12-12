<template>
  <div>
    <app-toolbar :title="$t('Wallet.title')">
      <v-select
        :items="user.communityList"
        v-model="communityId"
        item-text="name"
        item-value="id"
        :label="$t('CreateAccount.community')"
        single-line
        data-vv-name="community"
        hide-details
        v-on:change="changeCommunity"
      >
      </v-select>
    </app-toolbar>

    <v-card flat>
      <v-card-title primary-title>
        <v-layout align-center row>
          <v-flex>
            <span class="headline">{{$t('Wallet.balance')}}</span>
          </v-flex>
          <v-flex class="text-xs-right">
            <span class="title"><v-icon style="vertical-align: bottom">account_balance_wallet</v-icon> {{balance ? balance : ''}}</span>
          </v-flex>
        </v-layout>
      </v-card-title>
    </v-card>

    <v-divider></v-divider>

    <div>
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
                    {{transaction.debit ? (transaction.beneficiary !== undefined ? transaction.beneficiary.username : "") : (transaction.remitter !== undefined ? transaction.remitter.username : "") }}
                  </div>
                  <div class="body-3 text-xs-right" :class="{
                  'debit': transaction.debit,
                  'credit': !transaction.debit,
                  'text-opaque': !transaction.completed }">
                    {{formattedAmount(transaction)}}
                  </div>
                </v-layout>
                <v-layout row justify-space-between>
                  <div>
                    <v-list-tile-sub-title v-html="transaction.description"></v-list-tile-sub-title>
                    <div class="caption grey--text">{{transaction.createdAt | moment('from') }}</div>
                  </div>
                  <v-chip disabled small outline color="orange" v-if="!transaction.completed">
                    {{$t('Wallet.pendingTransaction')}}
                  </v-chip>
                </v-layout>
              </div>
            </v-list-tile-content>

          </v-list-tile>
          <v-divider v-if="index + 1 < transactions.length" inset></v-divider>
        </template>
      </v-list>
      <v-alert v-else-if="!user.balance" type="info" value="true">{{$t('Wallet.empty')}}</v-alert>
    </div>

    <app-bottom-nav></app-bottom-nav>

  </div>
</template>

<script>
import gateway from "@/gateway";
import userService from "@/services/UserService";
import AppToolbar from "@/components/AppToolbar";
import AppBottomNav from "@/components/AppBottomNav";
import Avatar from "@/components/Avatar";
import Modal from "@/components/Modal";
import LoggedInUserConsumerMixin from "@/LoggedInUserConsumerMixin";

export default {
  mixins: [LoggedInUserConsumerMixin],
  components: {
    AppToolbar,
    Avatar,
    Modal,
    AppBottomNav
  },
  // beforeRouteEnter(to, from, next) {
  //   gateway.get('transactions?communityId=2').then(r => {next(vm => vm.transactions = r.data)})
  // },
  data() {
    return {
      transactions: [],
      communityId: null,
      balance: null,
      loading: false
    };
  },
  methods: {
    changeCommunity(community) {
      this.loading = true;
      var adminId = this.user.communityList.filter(
        item => item.id === community
      )[0].adminUserId;
      userService.setUserAdmin(adminId === this.user.id);
      gateway.get(`transactions?communityId=${community}`).then(r => {
        this.balance = this.user.balanceList.filter(
          item => item.communityId === community
        )[0].balance;
        this.transactions = r.data;
        this.loading = false;
      });
    },
    onUserChanged(user) {
      this.user = user;
      this.communityId = this.user.communityList[0].id;
      this.changeCommunity(this.user.communityList[0].id);
    },
    otherPartyUser(transaction) {
      return transaction.debit ? transaction.beneficiary : transaction.remitter;
    },
    formattedAmount(transaction) {
      return (transaction.debit ? "-" : "+") + transaction.amount;
    }
  },
  created() {
    userService.loadUser();
  }
};
</script>
<style scoped>
.debit {
  color: red;
}
.credit {
  color: green;
}
</style>