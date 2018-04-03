<template>
  <div>
    <v-toolbar fixed app>
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn @click="openClaimReward()" icon>
        <v-icon>photo_camera</v-icon>
      </v-btn>

      <slot name="extension" slot="extension"></slot>
    </v-toolbar>

    <claim-reward @close="claimRewardClosed()" v-if="showClaimReward"/>
  </div>
</template>

<script>
  import ClaimReward from '@/components/ClaimReward'

  export default {
    props: ['title'],
    components: {
      ClaimReward
    },
    data() {
      return {
        showClaimReward: false
      }
    },
    methods: {
      claimRewardClosed() {
        this.showClaimReward = false
      },
      openClaimReward() {
        this.showClaimReward = true
      }
    }
  }
</script>