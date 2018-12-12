<template>
  <form v-on:submit.prevent="createAd()">
    <v-card-text>
      <div>{{$t('AdCreate.type')}}</div>
      <v-radio-group v-model="ad.type" row
                     v-validate="'required'"
                     :error-messages="errors.collect('type')"
                     data-vv-name="type">
        <v-radio v-for="type in ['WANT', 'GIVE']" :key="type" :label="$t('AdCreate.adType.' +type)" :value="type"/>
      </v-radio-group>
      <v-text-field v-model="ad.title" :label="$t('AdCreate.title')" type="text"
                    :error-messages="errors.collect('title')"
                    v-validate="'required'"
                    data-vv-name="title"/>
      <v-text-field v-model="ad.description" :label="$t('AdCreate.description')" type="text"
                    :error-messages="errors.collect('description')"
                    v-validate="'required'"
                    data-vv-name="description"/>
      <v-text-field v-model="ad.points" :label="$t('AdCreate.points')" type="text"
                    :error-messages="errors.collect('reward')"
                    v-validate="'required|decimal'"
                    data-vv-name="reward"/>
      <v-text-field v-model="ad.location" :label="$t('AdCreate.location')" type="text"
                    :error-messages="errors.collect('location')"
                    v-validate="'required'"
                    data-vv-name="location"/>
       <v-select
        :items="user.communityList"
        v-model="ad.communityId"
        item-text="name"
        item-value="id"
        :label="$t('CreateAccount.community')"
        single-line
        data-vv-name="community"
        hide-details
        v-on:change="changeCommunity"
        :error-messages="errors.collect('community')"
        v-validate="'required'"
      />
    </v-card-text>
    <v-card-actions>
      <small style="text-align: right; color: #555; padding-right: 20px;">{{$t('AdCreate.createHint')}}</small>
      <v-spacer/>
      <v-btn right color="primary" type="submit" :disabled="loading">{{$t('AdCreate.createButton')}}</v-btn>
    </v-card-actions>
  </form>
</template>

  <script>
import gateway from "@/gateway";

export default {
  name: "AdCreate",
  props: ["closeModal", "user"],
  data() {
    return {
      ad: {
        communityId: null,
        createdBy: {
          id: this.user.id,
          fullName: this.user.fullName,
          username: this.user.username,
          description: this.user.description,
          location: this.user.location,
          avatarUrl: this.user.avatarUrl
        },
        title: null,
        description: null,
        points: null,
        location: null,
        own: true,
        payable: false,
        type: null,
        createdAt: Date()
      },
      loading: false
    };
  },
  methods: {
    changeCommunity(communityId) {
      this.ad.communityId = communityId;
    },
    createAd() {
      this.$validator.validateAll().then(valid => {
        if (!valid) return;
        this.loading = true;

        var balance = this.user.balanceList.filter(
          item => item.communityId == this.communityId
        )[0];

        if (balance == 0) this.ad.payable = false;
        else {
          if (this.ad.own === true && this.ad.type === "WANT")
            this.ad.payable = true;
          else if (this.ad.own === false && this.ad.type === "GIVE")
            this.ad.payable = true;
        }

        gateway
          .post("/ads", this.ad)
          .then(r => {
            this.closeModal();
            this.$router.push(`/community/ad/${r.data.id}`);
          })
          .catch(error => (this.loading = false));
      });
    }
  }
};
</script>