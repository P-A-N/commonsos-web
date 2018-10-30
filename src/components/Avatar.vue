<template>
  <v-avatar>
    <img :src="user.avatarUrl || defaultAvatar" @click.prevent="showProfile(user)"/>
  </v-avatar>
</template>

<script>
  export default {
    props: ['user'],
    data() {
      return {
        defaultAvatar: '/static/avatar-placeholder.png'
      }
    },
    methods: {
      showProfile(user) {
        this.$router.push('/profile/'+user.id)
      }
    },
  }
</script>
