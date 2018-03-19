<template>
  <div>
    <table class="table table-hover table-striped">
      <thead>
        <tr>
          <th>Accepted at</th>
          <th>Provided by</th>
          <th>Title</th>
          <th>Description</th>
          <th>Location</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="agreement in agreements">
          <td>{{agreement.createdAt | moment('from') }}</td>
          <td>{{agreement.providerId}}</td>
          <td>{{agreement.title}}</td>
          <td>{{agreement.description}}</td>
          <td>{{agreement.location}}</td>
          <td>{{agreement.points}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import gateway from '../gateway'

  export default {
    created() {
      gateway.get('agreements').then(r => this.agreements = r.data)
    },
    data() {
      return {
        agreements: []
      }
    }
  }
</script>

<style scoped>
</style>
