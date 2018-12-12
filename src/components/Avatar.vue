<template>
  <v-avatar>
    <img :src="user.avatarUrl || defaultAvatar" @click.prevent="showProfile(user)"/>
  </v-avatar>
</template>

<script>
export default {
  props: ["user"],
  data() {
    return {
      defaultAvatar: "/static/avatar-placeholder.png"
    };
  },
  methods: {
    showProfile(user) {
      var temp = null;
      this.$router.push("/profile/" + user.id + `/${temp}/${temp}`);
    }
  }
};
</script>
