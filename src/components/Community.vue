<template>
  <div>
    <app-toolbar title="Community">
      <v-btn slot="default" icon @click.prevent="openCreateAdDialog()" class="create-ad">
        <v-icon>add</v-icon>
      </v-btn>
    </app-toolbar>

    <ad-list ref="list"/>

    <modal v-if="createAd" title="New advertisement" @close="closeCreateAdDialog">
      <ad-create slot-scope="modal" :closeModal="modal.close"></ad-create>
    </modal>
  </div>
</template>

<script>
  import AdList from '@/components/AdList'
  import AppToolbar from '@/components/AppToolbar'
  import AdCreate from '@/components/AdCreate'
  import Modal from '@/components/Modal'

  export default {
    components: {
      AdList,
      AppToolbar,
      AdCreate,
      Modal
    },
    data() {
      return {
        createAd: false,
      }
    },
    methods: {
      openCreateAdDialog() {
        this.createAd = true
      },
      closeCreateAdDialog() {
        this.createAd = false
        this.$refs.list.loadAds()
      }
    }
  }
</script>
