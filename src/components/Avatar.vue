<template>
  <v-avatar>
    <img :src="imageSrc">
  </v-avatar>
</template>

<script>
  import Modal from '@/components/Modal'
  import ClaimReward from '@/components/ClaimReward'

  export default {
    props: ['userId'],
    data() {
      return {
        showClaimReward: false
      }
    },
    computed: {
      imageSrc() {
        let images = {
          worker: 'https://image.jimcdn.com/app/cms/image/transf/none/path/s09a03e3ad80f8a02/image/i788e42d25ed4115e/version/1493969515/image.jpg',
          elderly1: 'https://i.pinimg.com/originals/df/5c/70/df5c70b3b4895c4d9424de3845771182.jpg',
          elderly2: 'https://qph.fs.quoracdn.net/main-qimg-42b85e5f162e21ce346da83e8fa569bd-c'
        }
        return images[this.userId] || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPlkwhBse_JCK37_0WA3m_PHUpFncOVLM0s0c4cCqpV27UteuJ';
      }
    },
    components: {
      Modal, ClaimReward
    }
  }
</script>