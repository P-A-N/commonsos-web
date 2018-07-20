<template>
  <div v-if="otherUser" >
    <v-card>
      <v-card-media :src="otherUser.avatarUrl || '/static/avatar-placeholder.png'"
                    height="250px">
        <v-layout column
                  class="media card-image-gradient">
          <v-card-title>
            <v-btn slot="left" dark icon @click="goback()">
              <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-spacer></v-spacer>
        </v-layout>

      </v-card-media>
      <v-card-title
          primary-title
          class="pb-0"
          style="position: relative"
      >
        <v-layout column>
          <div class="headline">{{otherUser.fullName}}</div>
          <div>{{otherUser.description}}</div>
        </v-layout>
      </v-card-title>
      <v-list>

        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="primary">location_on</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{otherUser.location}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider inset v-if="otherUser.balance" ></v-divider>
        <v-list-tile v-if="otherUser.balance" >
          <v-list-tile-action>
            <v-icon color="primary">account_balance_wallet</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{otherUser.balance}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-card>

    <v-container v-if="user" fluid grid-list-lg>
      <v-btn class="make-payment" block @click.prevent="makePayment=true">
        {{user.admin ? $t('OtherUserProfile.makeTopup') : $t('OtherUserProfile.makePayment')}}
      </v-btn>
      <modal v-if="makePayment"
             :title="user.admin ? $t('OtherUserProfile.makeTopupModalTitle') : $t('OtherUserProfile.makePaymentModalTitle')"
             @close="paymentDone()">
        <make-payment :amount="user.admin ? '2000' : ''"
                      :beneficiary="otherUser"
                      :description="user.admin ? $t('OtherUserProfile.makeTopupDefaultDescription') : ''"
                      slot-scope="modal" :closeModal="modal.close"/>
      </modal>
    </v-container>
  </div>
</template>

<script>
  import AppToolbar from '@/components/AppToolbar'
  import Avatar from '@/components/Avatar'
  import Modal from '@/components/Modal'
  import MakePayment from '@/components/MakePayment'
  import gateway from '@/gateway'
  import LoggedInUserConsumerMixin from '@/LoggedInUserConsumerMixin'

  export default {
    props: ['userId'],
    mixins: [LoggedInUserConsumerMixin],
    components: {
      AppToolbar, Avatar, MakePayment, Modal
    },
    data() {
      return {
        otherUser: {},
        makePayment: false
      }
    },
    created() {
      this.loadOtherUser();
    },
    methods: {
      goback() {
        this.$router.back()
      },
      loadOtherUser() {
        gateway.get(`/users/${this.userId}`).then(r => this.otherUser = r.data)
      },
      paymentDone() {
        this.makePayment = false
        this.loadOtherUser()
      }
    }
  }
</script>
