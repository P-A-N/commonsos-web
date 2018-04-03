<template>
  <div>
    <v-toolbar fixed app>
      <v-toolbar-title>Community</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn :to="'/claim-reward'" icon>
        <v-icon>photo_camera</v-icon>
      </v-btn>
      <v-tabs right fixed-tabs slot="extension" v-model="activeTab">
        <v-tab :href="'#ads'">Advertisements</v-tab>
        <v-tab :href="'#agreements'">My services</v-tab>
      </v-tabs>
    </v-toolbar>

    <v-tabs-items v-model="activeTab">
      <v-tab-item :id="'ads'">
        <v-card flat>
          <AdList></AdList>
        </v-card>
      </v-tab-item>
      <v-tab-item :id="'agreements'">
        <v-card flat>
          <AgreementList></AgreementList>
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
      'AdList': AdList, 'AgreementList': AgreementList
    },
    data() {
      return {
        activeTab: 'ads',
      }
    }
  }
</script>