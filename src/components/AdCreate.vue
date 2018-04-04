<template>

  <v-dialog fullscreen v-model="showDialog" transition="dialog-bottom-transition"
            :overlay="false"
            scrollable>

    <v-card tile>

      <v-toolbar card dark color="primary">
        <v-btn icon @click="closeDialog()" dark>
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>New advertisement</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <form v-on:submit.prevent="createAd()">
        <v-card-text>
          <v-text-field v-model="ad.title" label="Title" type="text"
                        :error-messages="errors.collect('title')"
                        v-validate="'required'"
                        data-vv-name="title"/>
          <v-text-field v-model="ad.description" label="Description" type="text"
                        :error-messages="errors.collect('description')"
                        v-validate="'required'"
                        data-vv-name="description"/>
          <v-text-field v-model="ad.points" label="Reward" type="text"
                        :error-messages="errors.collect('reward')"
                        v-validate="'required|decimal'"
                        data-vv-name="reward"/>
          <v-text-field v-model="ad.location" label="Location" type="text"
                        :error-messages="errors.collect('location')"
                        v-validate="'required'"
                        data-vv-name="location"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn right type="submit">Add</v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
  import gateway from '@/gateway'

  export default {
    name: 'AdCreate',
    data() {
      return {
        ad: {},
        showDialog: false
      }
    },
    created() {
      setTimeout(() => this.showDialog = true, 0)
    },
    methods: {
      createAd() {
        this.$validator.validateAll().then((valid) => {
          if (!valid) return
          gateway.post('/ads', this.ad)
            .then(() => this.close())
            .catch(error => console.log(error))
        })
      },
      close() {
        this.showDialog = false
        this.$emit('onClose')
      }
    }
  }
</script>