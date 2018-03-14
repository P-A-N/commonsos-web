<template>
  <form class="form-inline mt-2 mt-md-0">
    <select class="form-control" v-model="user">
      <option value="worker">Worker</option>
      <option value="elderly">Elderly</option>
    </select>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        user: 'elderly'
      }
    },
    watch: {
      user: function (value) {
        localStorage.user = value
      }
    }
  }
</script>