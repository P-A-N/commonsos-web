<template>
  <div>
    <app-toolbar :title="$t('Community.title')">
      <v-select
        :items="user.communityList"
        v-model="communityId"
        item-text="name"
        item-value="id"
        :label="$t('CreateAccount.community')"
        single-line
        data-vv-name="community"
        hide-details
        v-on:change="changeCommunity"
      >
      </v-select>
      <v-btn slot="default" icon @click="toggleSearchDialog()">
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn slot="default" icon @click.prevent="openCreateAdDialog()" class="create-ad" :disabled="searchVisible">
        <v-icon>add</v-icon>
      </v-btn>

      <v-text-field slot="extension" v-model="searchPattern" v-if="searchVisible"
                    class="px-2" clearable :placeholder="$t('Community.searchHint')" type="text"/>
    </app-toolbar>

    <ad-list :ads="ads" v-if="!loading"/>

    <app-bottom-nav></app-bottom-nav>

    <modal v-if="createAd" :title="$t('Community.newAdvertisementModalTitle')" @close="closeCreateAdDialog">
      <ad-create slot-scope="modal" :closeModal="modal.close" :user="user"></ad-create>
    </modal>
  </div>
</template>

<script>
import AdList from "@/components/AdList";
import AppToolbar from "@/components/AppToolbar";
import AppBottomNav from "@/components/AppBottomNav";
import AdCreate from "@/components/AdCreate";
import Modal from "@/components/Modal";
import gateway from "@/gateway";
import userService from "@/services/UserService";
import LoggedInUserConsumerMixin from "@/LoggedInUserConsumerMixin";

export default {
  mixins: [LoggedInUserConsumerMixin],
  components: {
    AdList,
    AppToolbar,
    AppBottomNav,
    AdCreate,
    Modal
  },
  data() {
    return {
      loading: true,
      communityId: null,
      searchVisible: false,
      searchPattern: "",
      createAd: false,
      timer: null,
      ads: [],
      user: null
    };
  },
  // beforeRouteEnter(to, from, next) {
  //   gateway.get('/ads').then(r => {next(vm => vm.ads = r.data)})
  // },
  watch: {
    searchPattern: function() {
      this.searchUpdated();
    }
  },
  methods: {
    onUserChanged(user) {
      this.user = user;
      this.communityId = this.user.communityList[0].id;
      this.changeCommunity(this.user.communityList[0].id);
    },
    loadAds(communityId) {
      this.loading = true;
      gateway.get(`/ads?communityId=${communityId}`).then(r => {
        this.ads = r.data;
        this.loading = false;
      });
    },
    filter(pattern) {
      gateway
        .get(`/ads?communityId=${communityId}`, { params: { filter: pattern } })
        .then(r => (this.ads = r.data));
    },
    toggleSearchDialog() {
      this.searchVisible = !this.searchVisible;
      if (!this.searchVisible) this.filter("");
    },
    searchUpdated() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.filter(this.searchPattern);
      }, 400);
    },
    openCreateAdDialog() {
      this.createAd = true;
    },
    closeCreateAdDialog() {
      this.createAd = false;
      this.loadAds(this.communityId);
    },
    changeCommunity(communityId) {
      this.loadAds(communityId);
    }
  },
  created() {
    if (
      !String(this.$router.currentRoute.path).startsWith("/create-account/")
    ) {
      userService.loadUser().then(() => messagePoller.start());
    }
  }
};
</script>
