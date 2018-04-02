<template>
  <div>
    <v-toolbar fixed app>
      <v-toolbar-title>Wallet</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn :to="'/claim-reward'" icon>
        <v-icon>photo_camera</v-icon>
      </v-btn>
      <v-tabs right fixed-tabs slot="extension" v-model="model">
        <v-tab :href="'#ads'">Advertisements</v-tab>
        <v-tab :href="'#agreements'">My services</v-tab>
      </v-tabs>
    </v-toolbar>

    <v-tabs-items v-model="model">
      <v-tab-item :id="'ads'">
        <v-card flat>
          <v-card-text v-text="text"></v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item :id="'agreements'">
        <v-card flat>
          <v-card-text v-text="'asdfasdf'"></v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        model: 'ads',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    }
  }
</script>