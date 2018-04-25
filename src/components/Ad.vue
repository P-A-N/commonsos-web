<template>
  <v-layout v-if="ad" row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-media :src="ad.photoUrl || '/static/temp/ad-placeholder.png'" height="250px">
          <v-layout column class="media card-image-gradient">
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
                  style="position: absolute; bottom: 15px; left: 10px;">
            <v-icon small>label</v-icon>&nbsp;{{ad.type}}
          </v-chip>

        </v-card-media>
        <v-card-title primary-title style="position: relative">
          <v-layout column>
            <div class="headline">{{ad.title}}</div>
            <div>{{ad.description}}</div>
          </v-layout>

          <v-btn
            v-if="!ad.own"
            absolute
            dark
            fab
            top
            right
            color="primary"
            @click="messageForAd(ad)">
            <v-icon>message</v-icon>
          </v-btn>
        </v-card-title>
        <v-list>
          <v-list-tile v-if="false" @click="">
            <v-list-tile-action>
              <v-icon color="primary">access_time</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>30 September 9:30 to 19:00</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset v-if="false"></v-divider>

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

          <v-card flat :to="`/profile/${ad.createdBy.id}`">
            <v-layout align-center row>

              <v-flex ml-3 xs2>
                <avatar :user="ad.createdBy"/>
              </v-flex>

              <v-flex my-2>
                <div class="title">{{ad.createdBy.fullName}}</div>
              </v-flex>

              <v-flex mr-3 xs1>
                <v-icon>keyboard_arrow_right</v-icon>
              </v-flex>
            </v-layout>
          </v-card>

          <v-btn v-if="!ad.own" large block color="primary" @click="messageForAd(ad)" class="ml-0 mt-3 message-button">
            <v-icon small left>message</v-icon>
            {{ $t('Ad.sendMessage') }}
          </v-btn>
        </v-container>

      </v-card>
    </v-flex>
  </v-layout>
  <div v-else>
    {{ $t('General.loadingData') }}
  </div>

</template>

<script>
  import gateway from '@/gateway'
  import AppToolbar from '@/components/AppToolbar'
  import MessageThread from '@/components/MessageThread'
  import Avatar from '@/components/Avatar'

  export default {
    name: 'Ad',
    components: {AppToolbar, Avatar, MessageThread},
    created() {
      gateway.get(`/ads/${this.id}`).then(r => this.ad = r.data)
    },
    props: ['id', 'closeModal'],
    data() {
      return {
        ad: null
      }
    },
    methods: {
      messageForAd(ad) {
        gateway.post(`/message-threads/for-ad/${this.id}`)
          .then(r => $router.push('/messages/'+r.data.id))
      }
    }
  }
</script>