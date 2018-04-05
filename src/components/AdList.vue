<template>
  <div>
    <v-expansion-panel v-if="ads.length" popout>
      <v-expansion-panel-content v-for="(ad, index) in ads" :key="index" hide-actions class="ad">
        <v-layout align-center row slot="header">
          <v-flex xs3>
            <avatar :userId="ad.createdBy"/>
          </v-flex>
          <v-flex>
            <div>{{ad.title}}</div>
          </v-flex>
          <v-flex xs2 class="body-2 text-xs-right">
            {{ad.points}}
          </v-flex>
        </v-layout>
        <v-card>
          <v-card-text>
            {{ad.description}}
            <v-chip>{{ad.location}}</v-chip>
            </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn v-if="ad.acceptable" class="accept-ad grey lighten-3" @click="acceptAd(ad)" small flat>
              Accept
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-btn id="create-ad" @click.prevent="openCreateAdDialog()" fixed dark fab bottom right color="pink">
      <v-icon>add</v-icon>
    </v-btn>

    <modal v-if="createAd" title="New advertisement" @close="closeCreateAdDialog">
      <AdCreate slot-scope="modal" :closeModal="modal.close"></AdCreate>
    </modal>
  </div>
</template>

<script>

  import router from '@/router'
  import gateway from '@/gateway'
  import AdCreate from '@/components/AdCreate'
  import Modal from '@/components/Modal'
  import Avatar from '@/components/Avatar'
  import notifications from '@/services/notifications'

  export default {
    name: 'AdList',
    components: {AdCreate, Modal, Avatar},
    created() {
      this.loadAds()
    },
    data() {
      return {
        ads: [],
        createAd: false
      }
    },
    methods: {
      openCreateAdDialog() {
        this.createAd = true
      },
      closeCreateAdDialog() {
        this.createAd = false
        this.loadAds()
      },
      loadAds() {
        gateway.get('/ads').then(r => this.ads = r.data)
      },
      acceptAd(ad) {
        if (confirm('Are you sure you would like to accept this service?'))
          gateway
            .post(`/ads/${ad.id}/accept`)
            .then(r => {
              notifications.i('Advertisement successfully accepted')
              router.push('/community/agreements')
            }).catch(e => console.log(e))
      }
    }
  }
</script>

<style scoped>
  #create-ad {
    bottom: 70px;
  }
</style>
