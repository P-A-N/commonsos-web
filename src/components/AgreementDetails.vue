<template>
  <div>
    <qrcode class="my-3" v-bind:text="agreement.transactionData"></qrcode>
    <br>
    Reward claim code: <b>{{agreement.transactionData}}</b>
  </div>
</template>

<script>
  import VueQRCodeComponent from 'vue-qrcode-component'
  import gateway from '@/gateway'
  import router from '@/router'

  export default {
    props: ['id'],
    data() {
      return {
        agreement: {transactionData: ''}
      }
    },
    created() {
      gateway.get(`agreements/${this.id}`).then(r => this.agreement = r.data).catch(error => console.log(error))
    },
    components: {
      'qrcode': VueQRCodeComponent
    }
  }
</script>

<style scoped>
</style>
