<template>
  <form v-on:submit.prevent="claimReward()">
    <div class="form-group">
      <label for="code">Enter reward code</label>
      <input type="text" class="form-control" autocomplete="off" id="code" v-model="code">
    </div>

    <div class="alert alert-danger" v-if="error">{{error}}</div>
    <div class="alert alert-success" v-if="transaction">
      You have successfully claimed your reward of {{transaction.amount}} points!
    </div>

    <button type="submit" class="btn btn-primary">Claim reward</button>
  </form>
</template>

<script>
  import gateway from '@/gateway'
  import eventbus from '@/eventbus'

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
            eventbus.$emit('reload-balance')
          })
          .catch(error => {
            this.transaction = null
            this.error = 'Failed to claim reward. Please verify that you are using correct code and you are eligible to claim it!'
          })
      }
    }
  }
</script>