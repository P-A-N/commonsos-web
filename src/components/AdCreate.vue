<template>
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
      <label for="points">Points</label>
      <div class="input-group">
        <input type="text" class="form-control" id="points" name="points"
               v-model="ad.points" v-validate="'required|decimal'">
      </div>
      <p class="text-danger" v-show="errors.has('points')">{{errors.first('points')}}</p>
    </div>

    <div class="form-group">
      <label for="location">Location</label>
      <input type="text" class="form-control" id="location" name="location"
             v-model="ad.location" v-validate="'required'">
      <p class="text-danger" v-show="errors.has('location')">{{errors.first('location')}}</p>
    </div>

    <button type="submit" class="btn btn-primary">Add</button>
  </form>
</template>

<script>
  import router from '../router'
  import gateway from '../gateway'

  export default {
    name: 'AdCreate',
    data() {
      return {
        ad: {},
      }
    },
    methods: {
      createAd() {
        this.$validator.validateAll().then((valid) => {
          if (!valid) return;
          gateway({method: 'post', url: '/ads', data: this.ad})
            .then(response => router.push('/ads'))
            .catch(error => console.log(error))
        })
      }
    }
  }
</script>

<style scoped>
</style>
