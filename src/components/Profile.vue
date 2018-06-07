<template>
  <div v-if="user">
    <v-card>
      <v-card-media :src="user.avatarUrl" height="250px" style="background-color: #aaa;">
        <div class="center-horizontally-and-vertically" v-if="!user.avatarUrl">
          <upload-photo :url="`/users/${user.id}/avatar`" :onUpload="reloadUser">
            <v-btn slot="activator" dark outline round>
              <v-icon left dark>photo_camera</v-icon>
              {{$t('Profile.addPhoto')}}
            </v-btn>
          </upload-photo>
        </div>

        <v-layout column :class="{'media card-image-gradient': user.avatarUrl}">
          <v-card-title>
            <v-spacer></v-spacer>

            <upload-photo :url="`/users/${user.id}/avatar`" :onUpload="reloadUser" v-if="user.avatarUrl">
              <v-btn slot="activator" dark icon class="mr-2">
                <v-icon>photo_camera</v-icon>
              </v-btn>
            </upload-photo>

            <v-btn dark icon class="mr-0" to="/profile/edit">
              <v-icon>edit</v-icon>
            </v-btn>

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
          <div class="headline">
            {{user.fullName}}
          </div>
          <div>{{user.description}}</div>
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
          v-show="false"
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
        {{$t('Profile.logout')}}
      </v-btn>
    </v-container>


    <app-bottom-nav></app-bottom-nav>
  </div>
</template>

<script>
  import UploadPhoto from '@/components/UploadPhoto'
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
      Avatar,
      UploadPhoto
    },
    methods: {
      reloadUser: () => userService.loadUser(),
      logout: () => userService.logout(),
    }

  }
</script>
