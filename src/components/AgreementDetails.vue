<template>
  <div>
    <h1>{{agreement.title}}</h1>
    <div class="row">
      <div class="col-3">Description</div>
      <div class="col-9">{{agreement.description}}</div>
    </div>
    <div class="row">
      <div class="col-3">Location</div>
      <div class="col-9">{{agreement.location}}</div>
    </div>
    <div class="row">
      <div class="col-3">Reward</div>
      <div class="col-9">{{agreement.amount}}</div>
    </div>

    <qrcode class="my-5" v-bind:text="agreement.transactionData"></qrcode>

    <div class="d-print-none">
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
        agreement: {}
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
