<template>
  <div>
    <table class="table table-hover table-striped">
      <thead>
        <tr>
          <th>Publisher</th>
          <th>Title</th>
          <th>Description</th>
          <th>Points</th>
          <th>Location</th>
          <th width="10%"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ad in ads">
          <td>{{ad.createdBy}}</td>
          <td>{{ad.title}}</td>
          <td>{{ad.description}}</td>
          <td>{{ad.points}}</td>
          <td>{{ad.location}}</td>
          <td><button v-if="canBeAccepted(ad)" class="btn btn-sm btn-outline-primary accept-ad" @click="acceptAd(ad)">Accept</button></td>
        </tr>
      </tbody>
    </table>
    <button v-on:click="createAd" class="btn btn-lg btn-primary" id="create-ad" href="" role="button">New Job</button>
  </div>
</template>

<script>

  import router from '../router'
  import gateway from '../gateway'

  export default {
    name: 'AdList',
    created() {
      gateway.get('/ads').then(r => this.ads = r.data)
    },
    data() {
      return {
        ads: []
      }
    },
    methods: {
      createAd() {
        router.push('ads/create')
      },
      acceptAd(ad) {
        if (confirm('You are going to accept the offered service. Are you sure?'))
          gateway
            .post(`/ads/${ad.id}/accept`)
            .then(r => router.push('agreements')).catch(e => console.log(e))
      },
      canBeAccepted(ad) {
        return ad.createdBy !== localStorage.getItem('user')
      }
    }
  }
</script>

<style scoped>
</style>
