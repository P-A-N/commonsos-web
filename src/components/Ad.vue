<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-media :src="ad.photos[0].url" height="250px">
          <v-layout column class="media">
            <v-card-title>
              <v-btn dark icon @click="$router.go(-1)">
                <v-icon>close</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn dark icon class="mr-3">
                <v-icon>edit</v-icon>
              </v-btn>
              <!--<v-btn dark icon>-->
                <!--<v-icon>more_vert</v-icon>-->
              <!--</v-btn>-->
            </v-card-title>
            <v-spacer></v-spacer>
          </v-layout>

          <v-chip label
                  small
                  class="my-0"
                  text-color="white"
                  color="green"
                  absolute
                  style="position: absolute; bottom: 15px; left: 10px;"
          >
            <v-icon small>label</v-icon>&nbsp;Need
          </v-chip>

        </v-card-media>
        <v-card-title primary-title style="position: relative">
          <div class="headline">{{ad.title}}</div>
          <div>{{ad.description}}</div>
          <v-btn
              v-if="ad.acceptable"
              absolute
              dark
              fab
              top
              right
              color="primary"
              @click="messageForAd(ad)"
          >
            <v-icon>message</v-icon>
          </v-btn>
        </v-card-title>
        <v-list>

          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon color="primary">access_time</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>30 September</v-list-tile-title>
              <v-list-tile-sub-title>9:30 to 19:00</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset></v-divider>

          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon color="primary">location_on</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ad.location}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset></v-divider>

          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon color="primary">account_balance_wallet</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ad.points}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

        </v-list>

        <v-divider></v-divider>

        <v-container fluid grid-list-lg>

          <v-card flat>
            <v-layout align-center row>

              <v-flex ml-3 xs2>
                <avatar :userId="ad.createdBy"/>
              </v-flex>

              <v-flex my-2>
                <div class="title">Satayoshi Nakabe</div>
              </v-flex>

              <v-flex mr-3 xs1>
                <v-icon>keyboard_arrow_right</v-icon>
              </v-flex>
            </v-layout>
          </v-card>

          <v-btn v-if="ad.acceptable" large block color="primary" @click="messageForAd(ad)" class="ml-0 mt-3">
            <v-icon small left>message</v-icon>
            Send Message
          </v-btn>
        </v-container>

      </v-card>
    </v-flex>

    <modal v-if="messageThreadForAd" title="Message thread" @close="messageThreadForAd = null">
      <MessageThread slot-scope="modal" :close-modal="modal.close" :current-ad="messageThreadForAd"></MessageThread>
    </modal>

  </v-layout>

</template>

<script>

  import router from '@/router'
  import gateway from '@/gateway'
  import AppToolbar from '@/components/AppToolbar'
  import Modal from '@/components/Modal'
  import MessageThread from '@/components/MessageThread'
  import Avatar from '@/components/Avatar'

  export default {
    name: 'Ad',
    components: { AppToolbar, Modal, Avatar, MessageThread },
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
          "description":"I am a busy person needing help with cleaning. Proposed frequency once a week. Vacuum cleaning, moist cleaning, floors etc. ",
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