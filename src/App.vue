<template>
  <v-app>
    <v-content>
      <router-view/>
    </v-content>

    <global-notification/>

    <Loader></Loader>
  </v-app>
</template>

<script>
  import userService from '@/services/UserService'
  import GlobalNotification from '@/components/GlobalNotification'
  import AppToolbar from "./components/AppToolbar";
  import AppBottomNav from "./components/AppBottomNav";
  import Loader from "./components/Loader";

  export default {

    components: {
      AppToolbar,
      AppBottomNav,
      GlobalNotification,
      Loader
    },
    created() {
      userService.loadUser()
    }
  }
</script>