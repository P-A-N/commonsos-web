<template>
  <div v-if="user" >
    <app-toolbar title="Profile">
      <v-btn slot="left" icon @click="goback()">
        <v-icon>arrow_back</v-icon>
      </v-btn>
    </app-toolbar>

    <v-container fluid grid-list-lg mt-3>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card flat>
            <v-layout align-center row>

              <v-flex ml-3 xs2>
                <avatar :userId="user.id"/>
              </v-flex>

              <v-flex my-2>
                <div class="headline">{{user.fullName}}</div>
                <div class="caption" v-if="user.location"><v-icon small>location_on</v-icon>{{user.location}}</div>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container fluid grid-list-lg>
      <v-card flat>
        <v-card-title primary-title>
          <v-layout align-center row>
            <v-flex>
              <span class="headline">Balance</span>
            </v-flex>
            <v-flex class="text-xs-right">
              <span class="title">{{user.balance}}</span>
            </v-flex>
          </v-layout>
        </v-card-title>
      </v-card>
    </v-container>

    <v-container v-if="loggedInUser && loggedInUser.admin" fluid grid-list-lg>
      <v-btn class="top-up" block @click.prevent="makePayment=true">
        Top-up
      </v-btn>
    </v-container>

    <modal v-if="makePayment" title="Make payment" @close="paymentDone()">
      <make-payment amount="2000" :beneficiary="user" description="Funds from municipality" slot-scope="modal" :closeModal="modal.close"></make-payment>
    </modal>
  </div>
</template>

<script>
  import AppToolbar from '@/components/AppToolbar'
  import Avatar from '@/components/Avatar'
  import Modal from '@/components/Modal'
  import MakePayment from '@/components/MakePayment'
  import userService from '@/services/UserService'
  import gateway from '@/gateway'

  export default {
    props: ['userId'],
    components: {
      AppToolbar, Avatar, MakePayment, Modal
    },
    data() {
      return {
        loggedInUser: userService.user(),
        user: {},
        makePayment: false
      }
    },
    created() {
      this.loadUser();
    },
    methods: {
      goback() {
        this.$router.back()
      },
      loadUser() {
        gateway.get(`/users/${this.userId}`).then(r => this.user = r.data)
      },
      paymentDone() {
        this.makePayment=false
        this.loadUser();
      }
    }
  }
</script>
