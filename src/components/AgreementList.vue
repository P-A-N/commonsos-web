<template>
  <div>
    <table v-if="agreements.length" class="table table-stackable table-hover table-striped">
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
          <td data-title="Accepted at">{{agreement.createdAt | moment('from') }}</td>
          <td data-title="Provided by">{{agreement.providerId}}</td>
          <td data-title="Title">{{agreement.title}}</td>
          <td data-title="Description">{{agreement.description}}</td>
          <td data-title="Location">{{agreement.location}}</td>
          <td data-title="Reward">{{agreement.points}}</td>
          <td class="actions"><a href="#" @click.prevent="showDetails(agreement)">Show details</a></td>
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
        router.push('/agreements/'+agreement.id)
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
