<template>
  <div>
    <app-toolbar :title="$t('Community.title')">
      <v-btn slot="default" icon @click="toggleSearchDialog()">
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn slot="default" icon @click.prevent="openCreateAdDialog()" class="create-ad" :disabled="searchVisible">
        <v-icon>add</v-icon>
      </v-btn>

      <v-text-field slot="extension" v-model="searchPattern" v-if="searchVisible"
                    class="px-2" clearable :placeholder="$t('Community.searchHint')" type="text"/>
    </app-toolbar>

    <ad-list :ads="ads"/>

    <app-bottom-nav></app-bottom-nav>

    <modal v-if="createAd" :title="$t('Community.newAdvertisementModalTitle')" @close="closeCreateAdDialog">
      <ad-create slot-scope="modal" :closeModal="modal.close"></ad-create>
    </modal>
  </div>
</template>

<script>
  import AdList from '@/components/AdList'
  import AppToolbar from '@/components/AppToolbar'
  import AppBottomNav from "@/components/AppBottomNav";
  import AdCreate from '@/components/AdCreate'
  import Modal from '@/components/Modal'
  import gateway from '@/gateway'

  export default {
    components: {
      AdList,
      AppToolbar,
      AppBottomNav,
      AdCreate,
      Modal
    },
    data() {
      return {
        searchVisible: false,
        searchPattern: '',
        createAd: false,
        timer: null,
        ads: []
      }
    },
    beforeRouteEnter(to, from, next) {
      gateway.get('/ads').then(r => {next(vm => vm.ads = r.data)})
    },
    watch: {
      'searchPattern': function() {
        this.searchUpdated()
      }
    },
    methods: {
      loadAds() {
        gateway.get('/ads').then(r => this.ads = r.data)
      },
      filter(pattern) {
        gateway.get('/ads', {params: {filter: pattern}}).then(r => this.ads = r.data)
      },
      toggleSearchDialog() {
        this.searchVisible = !this.searchVisible
        if (!this.searchVisible) this.filter('')
      },
      searchUpdated() {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.filter(this.searchPattern)
        }, 400)
      },
      openCreateAdDialog() {
        this.createAd = true
      },
      closeCreateAdDialog() {
        this.createAd = false
        this.loadAds()
      }
    }
  }
</script>
