<template>
  <div>
    <h1>{{agreement.title}}</h1>
    <div class="row">
      <div class="col-2">Description</div>
      <div class="col-10">{{agreement.description}}</div>
    </div>
    <div class="row">
      <div class="col-2">Location</div>
      <div class="col-10">{{agreement.location}}</div>
    </div>
    <div class="row">
      <div class="col-2">Reward</div>
      <div class="col-10">{{agreement.amount}}</div>
    </div>

    <qrcode class="my-3" v-bind:text="agreement.transactionData"></qrcode>

    <div class="row">
      <div class="col-12 pull-left">Reward claim code: <b>{{agreement.transactionData}}</b></div>
    </div>

    <div class="d-print-none mt-4">
      <button name="back" class="btn btn-outline-secondary" @click="back()">Back</button>
      <button name="print" class="btn btn-primary" @click="print()">Print</button>
    </div>
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
    },
    methods: {
      print: () => window.print(),
      back: () => router.back()
    },
  }
</script>

<style scoped>
</style>
