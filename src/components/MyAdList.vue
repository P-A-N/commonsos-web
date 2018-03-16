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
        </tr>
      </thead>
      <tbody>
        <tr v-for="ad in ads">
          <td>{{ad.createdBy}}</td>
          <td>{{ad.title}}</td>
          <td>{{ad.description}}</td>
          <td>{{ad.points}}</td>
          <td>{{ad.location}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import gateway from '../gateway'

  export default {
    created() {
      gateway.get('my-ads').then(r => this.ads = r.data)
    },
    data() {
      return {
        ads: []
      }
    }
  }
</script>

<style scoped>
</style>
