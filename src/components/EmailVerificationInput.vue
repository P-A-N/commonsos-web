<template>
    <v-container fluid fill-height>
        <v-layout column align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card-text >
                    <p class="text-xs-center">
                        {{$t('EmailVerification.hintSuccess')}}
                    </p>
                </v-card-text>
                <v-spacer></v-spacer>
                <v-card-actions style="justify-content: center">
                    <v-btn @click="startApp()" color="primary" type="submit" :disabled="loading">{{$t('EmailVerification.startApp')}}</v-btn>
                </v-card-actions>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import userService from "@/services/UserService";
import gateway from "@/gateway";
export default {
  name: "EmailVerificationInput",
  props: ["accessId"],
  data() {
    return {
      loading: true,
      error: true
    };
  },
  methods: {
    startApp() {
      if (this.error) {
        window.$router.push("/login");
      } else {
        window.$router.push("/profile");
        messagePoller.start();
      }
    }
  },
  created() {
    gateway
      .post(`/create-account/${this.accessId}`)
      .then(r => {
        this.setUser(r.data);
        this.loading = false;
        this.error = false;
      })
      .catch(err => {
        this.loading = false;
      });
  }
};
</script>