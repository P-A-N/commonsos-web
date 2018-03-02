<template>
  <div>
    <form v-on:submit.prevent="addJob">
    <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" name="title"
               v-model="job.title" v-validate="'required'">
        <p class="alert alert-danger" v-show="errors.has('title')">{{errors.first('title')}}</p>
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description" name="description"
               v-model="job.description" v-validate="'required'">
        <p class="alert alert-danger" v-show="errors.has('description')">{{errors.first('description')}}</p>
      </div>

      <div class="form-group">
        <label for="price">Price</label>
        <input type="text" class="form-control" id="price" name="price"
               v-model="job.price" v-validate="'required|decimal'">
        <p class="alert alert-danger" v-show="errors.has('price')">{{errors.first('price')}}</p>
      </div>

      <div class="form-group">
        <label for="location">Location</label>
        <input type="text" class="form-control" id="location" name="location"
               v-model="job.location" v-validate="'required'">
        <p class="alert alert-danger" v-show="errors.has('location')">{{errors.first('location')}}</p>
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
