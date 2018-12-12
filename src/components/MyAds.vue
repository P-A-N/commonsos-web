<template>
  <div>
    <v-expansion-panel v-if="ads.length" popout>
      <v-expansion-panel-content v-for="(ad, index) in ads" :key="index" hide-actions>
        <v-layout align-center row slot="header">
          <v-flex xs10>
            {{ad.title}}
            {{ad.createdAt | moment('from') }}
            </v-flex>
          <v-flex xs2>
            <v-btn @click.prevent="" flat small icon color="blue">
              <v-icon>edit</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-card>
          <v-card-text>{{ad.location}}</v-card-text>
          <v-card-text>{{ad.description}}</v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-alert v-else type="info" value="true">
      Here you can maintain ads created by you. You can update or edit ads. <br>Start with creating your first ad!
    </v-alert>

  </div>
</template>

<script>
  import gateway from '@/gateway'

  export default {
    created() {
      gateway.get('my-ads').then(r => this.ads = r.data)
    },
    data() {
      return {
        ads: []
      }
    }
  }
</script>

<style scoped>
  tbody tr {
    cursor: pointer;
  }
</style>
