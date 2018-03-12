<template>
  <div>
    <table class="table table-hover table-striped">
      <thead>
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Points</th>
        <th>Location</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="job in jobs">
        <td>{{job.title}}</td>
        <td>{{job.description}}</td>
        <td>{{job.points}}</td>
        <td>{{job.location}}</td>
      </tr>
      </tbody>
    </table>
    <button v-on:click="addJob" class="btn btn-lg btn-primary" href="" role="button">New Job</button>
  </div>
</template>

<script>
  export default {
    name: 'JobList',
    created() {
      gateway.get('/jobs').then(r => this.jobs = r.data)
    },
    data() {
      return {
        jobs: [{title: '234234'}]
      }
    },
    methods: {
      addJob() {
        this.$router.push('jobs/add')
      }
    }
  }
</script>

<style scoped>
</style>
