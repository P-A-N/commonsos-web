<template>
  <form class="form-inline mt-2 mt-md-0">
    <select class="form-control" v-model="user">
      <option value="worker">Worker</option>
      <option value="elderly1">Elderly 1</option>
      <option value="elderly2">Elderly 2</option>
    </select>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        user: localStorage.user || 'elderly1'
      }
    },
    watch: {
      user: function (value) {
        localStorage.user = value
        window.location.reload()
      }
    }
  }
</script>