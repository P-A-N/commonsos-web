<template>
  <div>
    <v-toolbar fixed app extension-height="48">
      <slot name="left"/>
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-spacer/>
      <slot name="default" slot="default"/>
      <slot name="extension" slot="extension"/>
    </v-toolbar>
  </div>
</template>

<script>
  export default {
    props: ['title']
  }
</script>