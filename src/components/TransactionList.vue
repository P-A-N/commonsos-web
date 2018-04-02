<template>
  <div>
    <div v-if="user">
      Balance {{user.balance}}
    </div>
    <table v-if="transactions.length" class="table table-hover table-striped">
      <thead>
        <tr>
          <th>Date</th>
          <th>From</th>
          <th>To</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in transactions">
          <td>{{transaction.createdAt | moment('from') }}</td>
          <td>{{transaction.remitterId}}</td>
          <td>{{transaction.beneficiaryId}}</td>
          <td>{{transaction.amount}}</td>
        </tr>
      </tbody>
    </table>
    <v-alert v-else type="info" value="true">No transactions</v-alert>
  </div>
</template>

<script>
  import gateway from '@/gateway'
  import eventbus from '@/eventbus'
  import userService from '@/services/UserService'

  export default {
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