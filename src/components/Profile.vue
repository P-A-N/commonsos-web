<template>
  <div v-if="user">
    <!--<app-toolbar title="Profile"/>-->

    <v-card>
      <v-card-media :src="user.avatarUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPlkwhBse_JCK37_0WA3m_PHUpFncOVLM0s0c4cCqpV27UteuJ'"
                    height="250px">
        <v-layout column
                  class="media card-image-gradient">
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn dark icon class="mr-2">
              <v-icon>collections_bookmark</v-icon>
            </v-btn>
            <v-btn dark icon class="mr-2">
              <v-icon>edit</v-icon>
            </v-btn>
            <!--<v-btn dark icon>-->
            <!--<v-icon>more_vert</v-icon>-->
            <!--</v-btn>-->
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
          <div class="headline">{{user.fullName}}</div>
          <div>I am an Engineer, currently unemployed. I like helping elderly people, I can help with daily chores.</div>
        </v-layout>
      </v-card-title>
      <v-list>

        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon color="primary">location_on</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{user.location}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider inset></v-divider>

        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon color="primary">account_balance_wallet</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{user.balance}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>

      <v-divider></v-divider>

    </v-card>


    <v-container fluid grid-list-lg>
      <v-btn
          block
          color="primary"
          @click.prevent="">
        <v-icon class="mr-2">collections_bookmark</v-icon>
        Manage my ads
      </v-btn>
      <v-btn class="logout mt-4"
             flat
             block
             color="grey"
             @click.prevent="logout()">
        <v-icon class="mr-2">power_settings_new</v-icon>
        Logout
      </v-btn>
    </v-container>


    <app-bottom-nav></app-bottom-nav>
  </div>
</template>

<script>
  import AppToolbar from '@/components/AppToolbar'
  import AppBottomNav from "@/components/AppBottomNav";
  import Avatar from '@/components/Avatar'
  import userService from '@/services/UserService'
  import LoggedInUserConsumerMixin from '@/LoggedInUserConsumerMixin'

  export default {
    mixins: [LoggedInUserConsumerMixin],
    components: {
      AppToolbar,
      AppBottomNav,
      Avatar
    },
    methods: {
      logout: () => userService.logout(),
    }


  }
</script>
