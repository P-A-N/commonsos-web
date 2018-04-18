<template>
  <div>
    <app-toolbar :title="ad.title">
      <v-btn slot="left" icon @click="$router.go(-1)">
        <v-icon>arrow_back</v-icon>
      </v-btn>
    </app-toolbar>



    <img :src="ad.photos[0].url" style="width: 100%;">

    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm6 offset-sm3>

          <h3 class="title mb-2">{{ad.title}}</h3>

          <v-layout column="true" class="my-3">
            <v-flex>
              <v-icon small>access_time</v-icon> 30 September at 9:30 to 19:00
            </v-flex>

            <v-flex>
              <v-icon small>location_on</v-icon> {{ad.location}}
            </v-flex>

            <v-flex class="body-2">
              <v-icon small>account_balance_wallet</v-icon> {{ad.points}}
            </v-flex>
          </v-layout>

          {{ad.description}}

          <v-btn v-if="ad.acceptable" color="primary" @click="messageForAd(ad)" class="ml-0 mt-3">
            Send Message
          </v-btn>

        </v-flex>
      </v-layout>
    </v-container>

    <modal v-if="messageThreadForAd" title="Message thread" @close="messageThreadForAd = null">
      <MessageThread slot-scope="modal" :close-modal="modal.close" :current-ad="messageThreadForAd"></MessageThread>
    </modal>

  </div>

</template>

<script>

  import router from '@/router'
  import gateway from '@/gateway'
  import AppToolbar from '@/components/AppToolbar'
  import Modal from '@/components/Modal'
  import MessageThread from '@/components/MessageThread'

  export default {
    name: 'Ad',
    components: { AppToolbar, Modal, MessageThread },
    created() {
      //gateway.get(`/ad/${this.id}`).then(r => this.ad = r.data).catch(error => console.log(error))
    },
    props: ['id', 'closeModal'],
    data() {
      return {
        ad: {
          "id":"0",
          "type": "Give",
          "createdBy":"0",
          "title":"House cleaning, a longer title testing, will it wrap",
          "description":"Vacuum cleaning, moist cleaning, floors etc",
          "points":1299.01,
          "location":"Kaga city",
          "acceptable":true,
          "createdAt":"2018-04-18T09:51:47.736+03:00",
          "photos": [
            {
              url: '/static/temp/sample-photo-apartment1.jpg'
            }
          ]
        },
        messageThreadForAd: null
      }
    },
    methods: {
      messageForAd(ad) {
        this.messageThreadForAd = ad
      }
    }
  }
</script>