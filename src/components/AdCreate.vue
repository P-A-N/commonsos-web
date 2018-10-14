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
    </v-card-text>
    <v-card-actions>
      <small style="text-align: right; color: #555; padding-right: 20px;">{{$t('AdCreate.createHint')}}</small>
      <v-spacer/>
      <v-btn right color="primary" type="submit" :disabled="loading">{{$t('AdCreate.createButton')}}</v-btn>
    </v-card-actions>
  </form>
</template>

  <script>
    import gateway from '@/gateway'

    export default {
      name: 'AdCreate',
      props: ['closeModal'],
      data() {
        return {
          ad: {type: null},
          loading: false
        }
      },
      methods: {
        createAd() {
          this.$validator.validateAll().then((valid) => {
            if (!valid) return
            this.loading = true
            gateway.post('/ads', this.ad)
              .then((r) => {
                this.closeModal()
                this.$router.push(`/community/ad/${r.data.id}`)
              })
              .catch(error => this.loading = false)
          })
        }
      }
    }
  </script>