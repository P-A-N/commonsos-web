<template>
  <div>
    <app-toolbar title="Community">
      <v-tabs slot="extension" right fixed-tabs v-model="activeTab">
        <v-tab :to="'/community/ads'">All ads</v-tab>
        <v-tab :to="'/community/my-ads'">My ads</v-tab>
      </v-tabs>
    </app-toolbar>

    <v-tabs-items v-model="activeTab">
      <v-tab-item id="/community/ads">
        <AdList v-if="activeTab === '/community/ads'"></AdList>
      </v-tab-item>
      <v-tab-item id="/community/my-ads">
        <MyAds v-if="activeTab === '/community/my-ads'"></MyAds>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
  import AdList from '@/components/AdList'
  import MyAds from '@/components/MyAds'
  import AppToolbar from '@/components/AppToolbar'

  export default {
    components: {
      AdList, MyAds, AppToolbar
    },
    data() {
      return {
        activeTab: '/community/ads',
      }
    }
  }
</script>