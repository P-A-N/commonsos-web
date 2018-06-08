<template>
  <div>
    <app-toolbar :title="$t('Community.title')">
      <v-btn slot="default" icon @click.prevent="toggleSearchDialog()">
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn slot="default" icon @click.prevent="openCreateAdDialog()" class="create-ad">
        <v-icon>add</v-icon>
      </v-btn>

      <v-text-field slot="extension" v-model="searchPattern" v-if="searchVisible" @keyup="searchUpdated" @change="searchUpdated"
                    class="px-2" clearable placeholder="Type text here" type="text"/>
    </app-toolbar>

    <ad-list ref="list"/>

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
        timer: null
      }
    },
    methods: {
      toggleSearchDialog() {
        this.searchVisible = !this.searchVisible
        if (!this.searchVisible) this.$refs.list.filter('')
      },
      searchUpdated() {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$refs.list.filter(this.searchPattern)
        }, 400)
      },
      openCreateAdDialog() {
        this.createAd = true
      },
      closeCreateAdDialog() {
        this.createAd = false
        this.$refs.list.loadAds()
      }
    }
  }
</script>
