<template>
  <div>
    <v-expansion-panel v-if="agreements.length" popout>
      <v-expansion-panel-content v-for="(agreement, index) in agreements" :key="index" hide-actions class="agreement">
        <v-layout align-center row slot="header">

          <v-flex xs3>
            <avatar :user="agreement.serviceProvider"/>
          </v-flex>

          <v-flex>
            <div>{{agreement.title}}</div>
            <div class="caption">{{agreement.createdAt | moment('from') }}</div>
          </v-flex>

          <v-flex xs2 class="body-2 text-xs-right">
            {{agreement.points}}
          </v-flex>
        </v-layout>
        <v-card>
          <v-card-text>{{agreement.location}}</v-card-text>
          <v-card-text>{{agreement.description}}</v-card-text>
          <v-card-actions>
            <v-btn @click.prevent="showQR(agreement)" flat color="blue" class="accept-ad">
              Show reward QR
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-alert v-else type="info" value="true">No advertisements have been accepted yet</v-alert>

    <modal v-if="agreementToShowQrFor" title="Reward QR" @close="agreementToShowQrFor = null">
      <AgreementDetails :id="agreementToShowQrFor.id" slot-scope="modal" :closeModal="modal.close"></AgreementDetails>
    </modal>

  </div>
</template>

<script>
  import gateway from '@/gateway'
  import Avatar from '@/components/Avatar'
  import Modal from '@/components/Modal'
  import AgreementDetails from '@/components/AgreementDetails'

  export default {
    components: {Avatar, Modal, AgreementDetails},
    created() {
      gateway.get('agreements').then(r => this.agreements = r.data)
    },
    methods: {
      showQR(agreement) {
        this.agreementToShowQrFor = agreement
      }
    },
    data() {
      return {
        agreements: [],
        agreementToShowQrFor: null
      }
    }
  }
</script>

<style scoped>
  tbody tr {
    cursor: pointer;
  }
</style>
