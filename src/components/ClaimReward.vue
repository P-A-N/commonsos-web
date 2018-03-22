<template>
  <form v-on:submit.prevent="claimReward()">
    <div class="form-group">
      <label for="code">Enter reward code</label>
      <input type="text" class="form-control" autocomplete="off" id="code" v-model="code">
    </div>

    <div class="alert alert-danger" v-if="error">Error: {{error}}</div>
    <div class="alert alert-success" v-if="success">{{success}}</div>

    <button type="submit" class="btn btn-primary">Claim reward</button>
  </form>
</template>

<script>
  import gateway from '@/gateway'
  import router from '@/router'

  export default {
    data() {
      return {
        code: '',
        error: null,
        success: null
      }
    },
    methods: {
      claimReward() {
        gateway.post('/claim-reward', {code: this.code})
          .then(data => {this.success = 'You have successfully claimed your reward!'; setTimeout(() => router.push('ads'), 3000)})
          .catch(error => this.error = error.response.statusText)
      }
    }
  }
</script>