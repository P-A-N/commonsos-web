<template>
  <div>
    <form v-on:submit.prevent="addJob">
    <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" v-model="job.title">
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description" v-model="job.description">
      </div>

      <div class="form-group">
        <label for="price">Price</label>
        <input type="text" class="form-control" id="price" v-model="job.price">
      </div>

      <div class="form-group">
        <label for="location">Location</label>
        <input type="text" class="form-control" id="location" v-model="job.location">
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
        job: {title: '', description: ''},
      }
    },
    methods: {
      addJob() {
        let router = this.$router
        gateway({
          method: 'post',
          url: '/jobs',
          data: this.job
        })
        .then(response => router.push('/jobs'))
        .catch(error => console.log(error))
      }
    }
  }
</script>

<style scoped>
</style>
