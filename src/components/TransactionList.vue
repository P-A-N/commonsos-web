<template>
  <div>
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
    <div v-else class="alert alert-info">No transactions</div>
  </div>
</template>

<script>
  import gateway from '@/gateway'

  export default {
    data() {
      return {
        transactions: []
      }
    },
    created() {
      gateway.get('transactions').then(r => this.transactions = r.data)
    }
  }
</script>

<style scoped>
</style>
