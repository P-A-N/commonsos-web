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
            <div>{{ad.description}}</div>
            <v-chip>{{ad.location}}</v-chip>
            </v-card-text>
          <v-card-actions>
            <v-btn v-if="ad.acceptable" color="blue" @click="messageForAd(ad)" flat>
              Send Message
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <modal v-if="messageThreadForAd" title="Message thread" @close="messageThreadForAd = null">
      <MessageThread slot-scope="modal" :close-modal="modal.close" :current-ad="messageThreadForAd"></MessageThread>
    </modal>
  </div>
</template>

<script>

  import router from '@/router'
  import gateway from '@/gateway'
  import AdCreate from '@/components/AdCreate'
  import Modal from '@/components/Modal'
  import MessageThread from '@/components/MessageThread'
  import Avatar from '@/components/Avatar'
  import notifications from '@/services/notifications'

  export default {
    name: 'AdList',
    components: {AdCreate, Modal, Avatar, MessageThread},
    created() {
      this.loadAds()
    },
    data() {
      return {
        messageThreadForAd: null,
        ads: [],
      }
    },
    methods: {
      loadAds() {
        gateway.get('/ads').then(r => this.ads = r.data)
      },
      messageForAd(ad) {
        this.messageThreadForAd = ad
      }
    }
  }
</script>