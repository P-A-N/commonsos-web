<template>
  <v-avatar>
    <img :src="users[0].avatarUrl || defaultAvatar" class="left-half">
    <img :src="users[1].avatarUrl || defaultAvatar" class="right-half">
  </v-avatar>
</template>

<script>
  export default {
    props: ['users'],
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

<style scoped>

  .upper-half {
    clip-path: inset(0 0 50% 0);
  }
  .lower-half {
    clip-path: inset(50% 0 0 0);
  }

  .left-half {
    clip-path: inset(0 50% 0 0);
    transform: translateX(3%);
  }

  .right-half {
    clip-path: inset(0 0 0 50%);
    transform: translateX(5%);
  }

  .upper-left {
    clip-path: inset(0 40% 50% 0);
  }
  .upper-right {
    clip-path: inset(0 0 50% 50%);
  }

  .lower-left {
    clip-path: inset(50% 50% 0 0);
  }

  .lower-right {
    clip-path: inset(50% 0 0 50%);
  }

  img {
    position: absolute; top: 0; left: 0;
  }

</style>