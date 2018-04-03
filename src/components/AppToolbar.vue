<template>
  <v-toolbar fixed app>
    <v-toolbar-title>{{title}}</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn :to="'/claim-reward'" icon>
      <v-icon>photo_camera</v-icon>
    </v-btn>

    <slot name="extension" slot="extension"></slot>
  </v-toolbar>
</template>

<script>
  export default {
    props: ['title']
  }
</script>