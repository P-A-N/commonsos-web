<template>
  <v-layout v-if="ad" row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-media :src="adPhotoOrPlaceHolder()" height="250px" style="background-color: #aaa;">
          <v-layout column :class="{'card-image-gradient': ad.photoUrl, 'media ': true}">
            <v-card-title>
              <v-btn dark icon @click="$router.back()">
                <v-icon>close</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <div class="center-horizontally-and-vertically" v-if="ad.own && !ad.photoUrl">
                <upload-photo :url="`/ads/${ad.id}/photo`" :onUpload="photoUploaded">
                  <v-btn slot="activator" dark outline round class="upload-photo-button">
                    <v-icon left dark>photo_camera</v-icon>
                    {{$t('Ad.addPhoto')}}
                  </v-btn>
                </upload-photo>
              </div>
              <upload-photo v-if="ad.own && ad.photoUrl" :url="`/ads/${ad.id}/photo`" :onUpload="photoUploaded">
                <v-btn slot="activator" dark icon class="mr-3 upload-photo-button">
                  <v-icon>add_a_photo</v-icon>
                </v-btn>
              </upload-photo>
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
            v-if="ad.own"
            absolute
            dark
            fab
            top
            right
            color="primary"
            @click="editForAd(ad)">
            <v-icon>edit</v-icon>
          </v-btn>
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

          <v-card flat :to="`/profile/${ad.createdBy.id}/${ad.communityId}/${ad.id}`">
            <v-layout align-center row>

              <v-flex ml-3 xs2>
                <avatar :user="ad.createdBy"/>
              </v-flex>

              <v-flex my-2>
                <div class="title">{{ad.createdBy.username}}</div>
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
    <modal v-if="editAd" :title="$t('Community.newAdvertisementModalTitle')" @close="closeCreateAdDialog">
      <ad-edit slot-scope="modal" :closeModal="modal.close" :ad="ad"></ad-edit>
    </modal>
  </v-layout>
  <div v-else>
    {{ $t('General.loadingData') }}
  </div>

</template>

<script>
import gateway from "@/gateway";
import AppToolbar from "@/components/AppToolbar";
import MessageThread from "@/components/MessageThread";
import Avatar from "@/components/Avatar";
import UploadPhoto from "@/components/UploadPhoto";
import Modal from "@/components/Modal";
import AdEdit from "@/components/AdEdit";

export default {
  name: "Ad",
  components: {
    AppToolbar,
    Avatar,
    MessageThread,
    UploadPhoto,
    Modal,
    AdEdit
  },
  props: ["id", "closeModal"],
  beforeRouteEnter(to, from, next) {
    gateway.get(`/ads/${to.params.id}`).then(r => {
      next(vm => (vm.ad = Object.assign({ photoUrl: "" }, r.data)));
    });
  },
  data() {
    return {
      ad: null,
      editAd: false
    };
  },
  methods: {
    adPhotoOrPlaceHolder() {
      if (!this.ad) return "";
      if (this.ad.photoUrl) return this.ad.photoUrl;
      if (!this.ad.own) return "/static/temp/ad-placeholder.png";
      return "";
    },
    photoUploaded(url) {
      this.ad.photoUrl = url;
    },
    messageForAd(ad) {
      gateway
        .post(`/message-threads/for-ad/${this.id}`)
        .then(r => $router.push("/messages/" + r.data.id));
    },
    editForAd(ad) {
      this.editAd = true;
    },
    closeCreateAdDialog() {
      this.createAd = false;
      this.loadAds();
    },
    onClickAd() {}
  }
};
</script>