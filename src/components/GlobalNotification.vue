<template>
  <v-snackbar v-model="visible" timeout="4000" :color="color" light>
    {{message}}
  </v-snackbar>
</template>

<script>
  export default {
    data() {
      return {
        visible: false,
        message: '',
        color: ''
        }
    },
    methods: {
      error(message) {
        this.color = 'red'
        this.message = message
        this.visible = true
      }
    },
  }
</script>