<template>
  <div>
    <v-expansion-panel v-if="agreements.length" popout>
      <v-expansion-panel-content v-for="(agreement, index) in agreements" :key="index" hide-actions class="agreement">
        <v-layout align-center row slot="header">

          <v-flex xs3>
            <avatar :userId="agreement.providerId"/>
          </v-flex>

          <v-flex>
            <div>{{agreement.title}}</div>
            <div class="caption">{{agreement.createdAt | moment('from') }}</div>
          </v-flex>

          <v-flex xs2 class="body-2 text-xs-right">
            {{agreement.points}}
          </v-flex>
        </v-layout>
        <v-card>
          <v-card-text>{{agreement.location}}</v-card-text>
          <v-card-text>{{agreement.description}}</v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn @click.prevent="showDetails(agreement)">
              Show reward QR
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-alert v-else type="info" value="true">No advertisements have been accepted yet</v-alert>
  </div>
</template>

<script>
  import gateway from '@/gateway'
  import router from '@/router'
  import Avatar from '@/components/Avatar'

  export default {
    components: {Avatar},
    created() {
      gateway.get('agreements').then(r => this.agreements = r.data)
    },
    methods: {
      showDetails(agreement) {
        router.push('/agreements/'+agreement.id)
      }
    },
    data() {
      return {
        agreements: []
      }
    }
  }
</script>

<style scoped>
  tbody tr {
    cursor: pointer;
  }
</style>
