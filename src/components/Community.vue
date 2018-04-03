<template>
  <div>
    <v-toolbar fixed app>
      <v-toolbar-title>Community</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn :to="'/claim-reward'" icon>
        <v-icon>photo_camera</v-icon>
      </v-btn>
      <v-tabs right fixed-tabs slot="extension" v-model="activeTab">
        <v-tab :to="'/community/ads'">Advertisements</v-tab>
        <v-tab :to="'/community/agreements'">My services</v-tab>
      </v-tabs>
    </v-toolbar>

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

  export default {
    components: {
      AdList, AgreementList
    },
    data() {
      return {
        activeTab: '/community/ads',
      }
    }
  }
</script>