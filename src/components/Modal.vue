<template>
  <v-dialog v-model="show" fullscreen transition="dialog-bottom-transition" :overlay="false">
    <v-card>
      <v-toolbar>
        <v-btn icon @click.native="close()">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>{{title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <slot name="right" slot="default"/>
      </v-toolbar>
      <slot :close="close"></slot>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['title'],
    created() {
      setTimeout(() => this.show = true, 0)
    },
    data() {
      return {
        show: false
      }
    },
    methods: {
      close(params) {
        this.show = false
        this.$emit('close', params)
      }
    },
    mounted: function () {
      document.addEventListener("keydown", (e) => {
        if (this.show && e.keyCode === 27) {
          this.close();
        }
      });
    }
  }
</script>