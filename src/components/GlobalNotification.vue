<template>
  <v-snackbar id="snackbar" v-model="visible" :timeout="timeout" :color="color" light>
    {{message}}
    <v-btn dark flat @click.native="visible = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
  import eventbus from '@/eventbus'

  export default {
    created() {
      eventbus.$on('global-message', (message) => this.showMessage(message.type, message.text))
    },
    watch: {
      '$route': function() {
        if (this.color === 'red') this.visible = false
      }
    },
    data() {
      return {
        visible: false,
        timeout: 5000,
        message: '',
        color: ''
        }
    },
    methods: {
      showMessage(type, message) {
        this.color = type === 'error' ? 'red' : 'blue'
        this.timeout = type === 'error' ? 100000000 : 5000
        this.message = message
        this.visible = true
      }
    }
  }
</script>