<template>
  <div>
    <form v-on:submit.prevent="addJob">
    <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" name="title"
               v-model="job.title" v-validate="'required'">
        <p class="text-danger" v-show="errors.has('title')">{{errors.first('title')}}</p>
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description" name="description"
               v-model="job.description" v-validate="'required'">
        <p class="text-danger" v-show="errors.has('description')">{{errors.first('description')}}</p>
      </div>

      <div class="form-group">
        <label for="points">Points</label>
        <div class="input-group">
          <input type="text" class="form-control" id="points" name="points"
                 v-model="job.points" v-validate="'required|decimal'">
        </div>
        <p class="text-danger" v-show="errors.has('points')">{{errors.first('points')}}</p>
      </div>

      <div class="form-group">
        <label for="location">Location</label>
        <input type="text" class="form-control" id="location" name="location"
               v-model="job.location" v-validate="'required'">
        <p class="text-danger" v-show="errors.has('location')">{{errors.first('location')}}</p>
      </div>

      <button type="submit" class="btn btn-primary">Add</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'JobAdd',
    data() {
      return {
        job: {},
      }
    },
    methods: {
      addJob() {
        let router = this.$router
        this.$validator.validateAll().then((valid) => {
          if (!valid) return;
          gateway({method: 'post', url: '/jobs', data: this.job})
            .then(response => router.push('/jobs'))
            .catch(error => console.log(error))
        })
      }
    }
  }
</script>

<style scoped>
</style>
