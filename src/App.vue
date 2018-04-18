<template>
  <v-app>
    <v-content>
      <router-view/>
    </v-content>

    <global-notification/>

  </v-app>
</template>

<script>
  import userService from '@/services/UserService'
  import GlobalNotification from '@/components/GlobalNotification'
  import AppToolbar from "./components/AppToolbar";
  import AppBottomNav from "./components/AppBottomNav";

  export default {

    components: {
      AppToolbar,
      AppBottomNav,
      GlobalNotification
    },
    created() {
      userService.loadUser()
    }
  }
</script>