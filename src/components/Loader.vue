<template>
    <v-progress-linear :indeterminate="true" v-show="visible" height="4" style="position: absolute; top: 0px; margin-top:0; z-index: 2000"></v-progress-linear>
</template>

<script>
  import eventbus from '@/eventbus'

  export default {
    data() {
      return {
        visible: false
      }
    },
    methods: {
      show() {
        this.visible = true
      },
      hide() {
        this.visible = false
      }
    },
    created() {
      eventbus.$on('show-loader', this.show)
      eventbus.$on('hide-loader', this.hide)
    },
    destroyed() {
      eventbus.$off('show-loader', this.show)
      eventbus.$off('hide-loader', this.hide)
    }
  }
</script>