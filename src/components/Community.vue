<template>
  <div>

    <app-toolbar title="Community">
      <v-tabs slot="extension" right fixed-tabs v-model="activeTab">
        <v-tab :to="'/community/ads'">All ads</v-tab>
        <v-tab :to="'/community/my-ads'">My ads</v-tab>
      </v-tabs>
      <v-btn slot="default" icon @click.prevent="openCreateAdDialog()">
        <v-icon>add</v-icon>
      </v-btn>
    </app-toolbar>

    <v-tabs-items v-model="activeTab">
      <v-tab-item id="/community/ads">
        <AdList v-if="activeTab === '/community/ads'"></AdList>
      </v-tab-item>
      <v-tab-item id="/community/my-ads">
        <MyAds v-if="activeTab === '/community/my-ads'"></MyAds>
      </v-tab-item>
    </v-tabs-items>

    <modal v-if="createAd" title="New advertisement" @close="closeCreateAdDialog">
      <AdCreate slot-scope="modal" :closeModal="modal.close"></AdCreate>
    </modal>

  </div>
</template>

<script>
  import AdList from '@/components/AdList'
  import MyAds from '@/components/MyAds'
  import AppToolbar from '@/components/AppToolbar'
  import AdCreate from '@/components/AdCreate'
  import Modal from '@/components/Modal'

  export default {
    components: {
      AdList, MyAds, AppToolbar, AdCreate, Modal
    },
    data() {
      return {
        createAd: false,
        activeTab: '/community/ads',
      }
    },
    methods: {
      openCreateAdDialog() {
        this.createAd = true
      },
      closeCreateAdDialog() {
        this.createAd = false
        this.loadAds()
      }
    }
  }
</script>
