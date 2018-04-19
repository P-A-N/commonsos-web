<template>
  <v-avatar>
    <img :src="user.avatarUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPlkwhBse_JCK37_0WA3m_PHUpFncOVLM0s0c4cCqpV27UteuJ'">
  </v-avatar>
</template>

<script>
  import Modal from '@/components/Modal'
  import ClaimReward from '@/components/ClaimReward'

  export default {
    props: ['user'],
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