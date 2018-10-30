<template>
  <form v-on:submit.prevent="editAd()">
    <v-card-media :src="adPhotoOrPlaceHolder()" height="250px" style="background-color: #aaa;">
      <v-layout column :class="{'card-image-gradient': ad.photoUrl, 'media ': true}">
        <v-card-title>
          <!-- <v-btn dark icon @click="$router.back()">
            <v-icon>close</v-icon>
          </v-btn> -->
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
    <v-card-text>
      <div>{{$t('AdCreate.type')}}</div>
      <v-radio-group v-model="ad.type" row
                     :error-messages="errors.collect('type')"
                     data-vv-name="type">
        <v-radio v-for="type in ['WANT', 'GIVE']" :key="type" :label="$t('AdCreate.adType.' +type)" :value="type"/>
      </v-radio-group>
      <v-text-field v-model="ad.title" :label="$t('AdCreate.title')" type="text"
                    :error-messages="errors.collect('title')"
                    v-validate="'required'"
                    data-vv-name="title"
                    value="{ad.title}"/>
      <v-text-field v-model="ad.description" :label="$t('AdCreate.description')" type="text"
                    :error-messages="errors.collect('description')"
                    v-validate="'required'"
                    value=""
                    data-vv-name="description"/>
      <v-text-field v-model="ad.points" :label="$t('AdCreate.points')" type="text"
                    :error-messages="errors.collect('reward')"
                    v-validate="'required|decimal'"
                    data-vv-name="reward"/>
      <v-text-field v-model="ad.location" :label="$t('AdCreate.location')" type="text"
                    :error-messages="errors.collect('location')"
                    v-validate="'required'"
                    data-vv-name="location"/>
    </v-card-text>
    <v-card-actions>
      <small style="text-align: right; color: #555; padding-right: 20px;">{{$t('AdCreate.createHint')}}</small>
      <v-spacer/>
      <v-btn right color="primary" type="submit" :disabled="loading">{{$t('AdEdit.updateButton')}}</v-btn>
      <v-btn right color="red" @click="onClickDelete()" :disabled="loading">{{$t('AdEdit.deleteButton')}}</v-btn>
    </v-card-actions>
  </form>
</template>

  <script>
import gateway from "@/gateway";
import UploadPhoto from "@/components/UploadPhoto";

export default {
  name: "AdEdit",
  props: ["closeModal", "ad"],
  components: {
    UploadPhoto
  },
  data() {
    return {
      loading: false
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
    editAd() {
      this.$validator.validateAll().then(valid => {
        if (!valid) return;
        this.loading = true;
        gateway
          .post(`/ads/${this.ad.id}`, this.ad)
          .then(r => {
            this.closeModal();
            //this.$router.push(`/community/ad/${r.data.id}`)
          })
          .catch(error => (this.loading = false));
      });
    },
    onClickDelete() {
      this.loading = true;
      gateway
        .post(`/ads/${this.ad.id}/delete`, this.ad)
        .then(r => {
          this.loading = false;
          this.closeModal();
          this.$router.push(`/community/`);
        })
        .catch(error => (this.loading = false));
    }
  }
};
</script>