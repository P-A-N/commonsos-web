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
        <tr v-for="ad in ads">
          <td>{{ad.title}}</td>
          <td>{{ad.description}}</td>
          <td>{{ad.points}}</td>
          <td>{{ad.location}}</td>
        </tr>
      </tbody>
    </table>
    <button v-on:click="createAd" class="btn btn-lg btn-primary" href="" role="button">New Job</button>
  </div>
</template>

<script>
  export default {
    name: 'AdList',
    created() {
      window.gateway.get('/ads').then(r => this.ads = r.data)
    },
    data() {
      return {
        ads: [{}]
      }
    },
    methods: {
      createAd() {
        window.router.push('ads/create')
      }
    }
  }
</script>

<style scoped>
</style>
