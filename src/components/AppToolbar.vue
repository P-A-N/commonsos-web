<template>
  <div>
    <v-toolbar fixed app>
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon @click="showClaimReward = true">
        <v-icon>photo_camera</v-icon>
      </v-btn>
      <modal v-if="showClaimReward" @close="showClaimReward = false" title="Claim reward">
        <claim-reward slot-scope="modal" :closeModal="modal.close"/>
      </modal>

      <slot name="extension" slot="extension"></slot>
    </v-toolbar>
  </div>
</template>

<script>
  import Modal from '@/components/Modal'
  import ClaimReward from '@/components/ClaimReward'

  export default {
    props: ['title'],
    data() {
      return {
        showClaimReward: false
      }
    },
    components: {
      Modal, ClaimReward
    }
  }
</script>