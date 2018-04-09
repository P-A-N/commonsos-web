<template>
  <div>
    <v-toolbar fixed app>
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <slot name="default" slot="default"></slot>
      <slot name="extension" slot="extension"></slot>
    </v-toolbar>
  </div>
</template>

<script>
  export default {
    props: ['title']
  }
</script>