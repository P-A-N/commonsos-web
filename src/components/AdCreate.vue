<template>

  <v-dialog fullscreen
            v-model="showDialog"
            transition="dialog-bottom-transition"
            :overlay="false"
            scrollable>

    <v-card tile>

      <v-toolbar card dark color="primary">
        <v-btn icon @click="closeDialog()" dark>
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>New advertisement</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="createAd()">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-card-text>
        <form v-on:submit.prevent="createAd">
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" class="form-control" id="title" name="title"
                   v-model="ad.title" v-validate="'required'">
            <p class="text-danger" v-show="errors.has('title')">{{errors.first('title')}}</p>
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <input type="text" class="form-control" id="description" name="description"
                   v-model="ad.description" v-validate="'required'">
            <p class="text-danger" v-show="errors.has('description')">{{errors.first('description')}}</p>
          </div>

          <div class="form-group">
            <label for="reward">Reward</label>
            <div class="input-group">
              <input type="text" class="form-control" id="reward" name="reward"
                     v-model="ad.points" v-validate="'required|decimal'">
            </div>
            <p class="text-danger" v-show="errors.has('reward')">{{errors.first('reward')}}</p>
          </div>

          <div class="form-group">
            <label for="location">Location</label>
            <input type="text" class="form-control" id="location" name="location"
                   v-model="ad.location" v-validate="'required'">
            <p class="text-danger" v-show="errors.has('location')">{{errors.first('location')}}</p>
          </div>

          <button type="submit" class="btn btn-primary">Add</button>
        </form>
      </v-card-text>
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
        showDialog: true
      }
    },
    methods: {
      createAd() {
        this.$validator.validateAll().then((valid) => {
          if (!valid) return
          gateway.post('/ads', this.ad)
            .then(() => this.closeDialog())
            .catch(error => console.log(error))
        })
      },
      closeDialog() {
        this.showDialog = false
        this.$emit('onClose')
      }

    }
  }
</script>