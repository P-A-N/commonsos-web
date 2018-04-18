<template>
  <div>
    <v-container grid-list-md v-if="ads.length">
      <v-layout row wrap>
        <v-flex xs12 sm6 offset-sm3
                v-for="(ad, index) in ads"
                :key="index"
                hide-actions
                class="ad"
        >
          <v-card :to="'/community/ad/' + ad.id">
            <v-card-title primary-title mb-0>


                <v-layout row="true">
                  <v-flex>
                    <h3 class="title mb-0">{{ad.title}}</h3>
                  </v-flex>
                  <v-flex class="text-xs-right mt-0">
                    <v-chip label small color="green" text-color="white" class="my-0">
                      <v-icon small>label</v-icon>&nbsp;Give
                    </v-chip>
                  </v-flex>
                </v-layout>

                <v-layout column="true">
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


            </v-card-title>
          </v-card>

        </v-flex>
      </v-layout>

    </v-container>
  </div>

  <!--<v-expansion-panel v-if="ads.length" popout>-->
    <!--<v-expansion-panel-content v-for="(ad, index) in ads" :key="index" hide-actions class="ad">-->
      <!--<v-layout align-center row slot="header">-->
        <!--<v-flex xs3>-->
          <!--<avatar :userId="ad.createdBy"/>-->
        <!--</v-flex>-->
        <!--<v-flex>-->
          <!--<div>{{ad.title}}</div>-->
        <!--</v-flex>-->
        <!--<v-flex xs2 class="body-2 text-xs-right">-->
          <!--{{ad.points}}-->
        <!--</v-flex>-->
      <!--</v-layout>-->
      <!--<v-card>-->
        <!--<v-card-text>-->
          <!--<div>{{ad.description}}</div>-->
          <!--<v-chip>{{ad.location}}</v-chip>-->
        <!--</v-card-text>-->
        <!--<v-card-actions>-->
          <!--<v-btn v-if="ad.acceptable" color="blue" @click="messageForAd(ad)" flat>-->
            <!--Send Message-->
          <!--</v-btn>-->
        <!--</v-card-actions>-->
      <!--</v-card>-->
    <!--</v-expansion-panel-content>-->
  <!--</v-expansion-panel>-->

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
        gateway.get('/ads').then(r => this.ads = r.data)
      }
    }
  }
</script>