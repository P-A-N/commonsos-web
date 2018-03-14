<template>
  <div>
    <table class="table table-hover table-striped">
      <thead>
        <tr>
          <th>Publisher</th>
          <th>Title</th>
          <th>Description</th>
          <th>Points</th>
          <th colspan="2">Location</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ad in ads">
          <td>{{ad.userId}}</td>
          <td>{{ad.title}}</td>
          <td>{{ad.description}}</td>
          <td>{{ad.points}}</td>
          <td>{{ad.location}}</td>
          <td><button class="btn btn-sm btn-outline-primary accept-ad" @click="acceptAd(ad)">Accept</button></td>
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
      },
      acceptAd(ad) {
        window.gateway.post(`/ads/${ad.id}/accept`).then(r => this.ads = this.ads.filter(a => a.id !== ad.id))
      }
    }
  }
</script>

<style scoped>
</style>
