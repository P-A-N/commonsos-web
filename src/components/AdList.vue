<template>
  <div>
    <v-list three-line>
      <template v-for="(ad, index) in ads">
        <v-subheader v-if="ad.header" :key="ad.header">{{ ad.header }}</v-subheader>
        <v-divider v-else-if="ad.divider" :inset="ad.inset" :key="index"></v-divider>

        <v-list-tile avatar v-else :key="index" @click="">
          <v-list-tile-avatar>
            <img :src="'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460'" :alt="ad.createdBy">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="ad.title"></v-list-tile-title>
            <v-list-tile-sub-title v-html="ad.description"></v-list-tile-sub-title>
            <v-list-tile-sub-title v-html="ad.location"></v-list-tile-sub-title>
            <v-list-tile-sub-title v-html="ad.points"></v-list-tile-sub-title>

          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn v-if="ad.acceptable" @click="acceptAd(ad)" icon color="blue" ripple >
              <v-icon color="white lighten-1">done</v-icon>

            </v-btn>
          </v-list-tile-action>
        </v-list-tile>

        <v-divider v-if="index + 1 < ads.length" ></v-divider>
      </template>
    </v-list>

    <v-btn id="create-ad" @click.prevent="openCreateAd()" fixed dark fab bottom right color="pink">
      <v-icon>add</v-icon>
    </v-btn>

    <AdCreate v-if="createAd" v-on:onClose="createAdDialogClosed()"></AdCreate>

  </div>
</template>

<script>

  import router from '@/router'
  import gateway from '@/gateway'
  import AdCreate from '@/components/AdCreate'
  import notifications from '@/services/notifications'

  export default {
    name: 'AdList',
    components: {AdCreate},
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
      openCreateAd() {
        this.createAd = true
      },
      createAdDialogClosed() {
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
