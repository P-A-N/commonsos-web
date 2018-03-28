<template>
  <div>
    <table v-if="agreements.length" class="table table-hover table-striped">
      <thead>
        <tr>
          <th>Accepted at</th>
          <th>Provided by</th>
          <th>Title</th>
          <th>Description</th>
          <th>Location</th>
          <th>Reward</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="agreement in agreements" @click="showDetails(agreement)" class="">
          <td>{{agreement.createdAt | moment('from') }}</td>
          <td>{{agreement.providerId}}</td>
          <td>{{agreement.title}}</td>
          <td>{{agreement.description}}</td>
          <td>{{agreement.location}}</td>
          <td>{{agreement.points}}</td>
          <td><a href="#" @click="showDetails(agreement)">Show details</a></td>
        </tr>
      </tbody>
    </table>
    <div v-else class="alert alert-info">No advertisements have been accepted yet</div>
  </div>
</template>

<script>
  import gateway from '@/gateway'
  import router from '@/router'

  export default {
    created() {
      gateway.get('agreements').then(r => this.agreements = r.data)
    },
    methods: {
      showDetails(agreement) {
        router.push('agreements/'+agreement.id)
      }
    },
    data() {
      return {
        agreements: []
      }
    }
  }
</script>

<style scoped>
  tbody tr {
    cursor: pointer;
  }
</style>
