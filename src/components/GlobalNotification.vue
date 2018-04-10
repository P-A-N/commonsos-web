<template>
  <v-snackbar v-model="visible" :timeout="4000" :color="color" light>
    {{message}}
  </v-snackbar>
</template>

<script>
  import eventbus from '@/eventbus'

  export default {
    created() {
      eventbus.$on('global-message', (message) => this.showMessage(message.type, message.text))
    },
    data() {
      return {
        visible: false,
        message: '',
        color: ''
        }
    },
    methods: {
      showMessage(type, message) {
        this.color = type === 'error' ? 'red' : 'blue'
        this.message = message
        this.visible = true
      }
    }
  }
</script>