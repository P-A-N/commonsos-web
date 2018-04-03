<template>
  <div>
    <app-toolbar title="Community">
      <v-tabs slot="extension" right fixed-tabs v-model="activeTab">
        <v-tab :to="'/community/ads'">Advertisements</v-tab>
        <v-tab :to="'/community/agreements'">My services</v-tab>
      </v-tabs>
    </app-toolbar>

    <v-tabs-items v-model="activeTab">
      <v-tab-item id="/community/ads">
        <v-card flat>
          <AdList v-if="activeTab === '/community/ads'"></AdList>
        </v-card>
      </v-tab-item>
      <v-tab-item id="/community/agreements">
        <v-card flat>
          <AgreementList v-if="activeTab === '/community/agreements'"></AgreementList>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
  import AdList from '@/components/AdList'
  import AgreementList from '@/components/AgreementList'
  import AppToolbar from '@/components/AppToolbar'

  export default {
    components: {
      AdList, AgreementList, AppToolbar
    },
    data() {
      return {
        activeTab: '/community/ads',
      }
    }
  }
</script>