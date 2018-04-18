<template>
  <div>
    <v-container grid-list-md v-if="ads.length">
      <v-layout row wrap>
        <v-flex xs12 sm6 offset-sm3
                v-for="(ad, index) in ads"
                :key="index"
                hide-actions
                class="ad">
          <v-card :to="'/community/ad/' + ad.id">

            <v-container fluid grid-list-lg>

              <v-layout row>
                <v-flex xs7>
                  <div>
                    <h3 class="title mb-0">{{ad.title}}</h3>

                    <v-layout column="true">
                      <v-flex class="pb-0">
                        <v-icon small>access_time</v-icon>
                        <span class="caption">{{ad.createdAt | moment('LLL') }}</span>
                      </v-flex>

                      <v-flex class="pb-0">
                        <v-icon small>location_on</v-icon>
                        <span class="caption">{{ad.location}}</span>
                      </v-flex>

                      <v-flex class="body-2">
                        <v-icon small>account_balance_wallet</v-icon>
                        <span class="caption">{{ad.points}}</span>
                      </v-flex>
                    </v-layout>

                  </div>
                </v-flex>
                <v-flex xs5>
                  <v-card-media
                      :src="ad.photoUrl"
                      height="125px"
                      cover
                      style="position: relative">
                    <v-chip
                        label small
                        color="green"
                        text-color="white"
                        style="position: absolute; right: 10px; top: 10px;"
                        class="ma-0">
                      <v-icon small>label</v-icon>&nbsp;{{ad.type}}
                    </v-chip>

                  </v-card-media>
                </v-flex>
              </v-layout>

            </v-container>

          </v-card>

        </v-flex>
      </v-layout>

    </v-container>
  </div>

</template>

<script>
  import gateway from '@/gateway'
  import AdCreate from '@/components/AdCreate'
  import Avatar from '@/components/Avatar'

  export default {
    name: 'AdList',
    components: {AdCreate, Avatar},
    created() {
      this.loadAds()
    },
    data() {
      return {
        ads: [],
      }
    },
    methods: {
      loadAds() {
        let mockData = (ads) => ads.map(a => {
          a.type = 'Need'
          return a
        })
        gateway.get('/ads').then(r => this.ads = mockData(r.data))
      }
    }
  }
</script>