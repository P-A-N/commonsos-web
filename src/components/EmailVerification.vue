<template>
    <v-container fluid fill-height>
        <v-layout v-if="!isVerified" align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card-text>
                    <p class="text-xs-center">
                        {{$t('EmailVerification.hintStart')}}
                    </p>
                </v-card-text>
                <v-spacer></v-spacer>
                <v-card-actions style="justify-content: center">
                    <v-btn @click="checkEmailVerified()" color="primary" type="submit">{{$t('EmailVerification.ok')}}</v-btn>
                </v-card-actions>
            </v-flex>
        </v-layout>
        <v-layout column v-if="isVerified" align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card-text >
                    <p class="text-xs-center">
                        {{$t('EmailVerification.hintSuccess')}}
                    </p>
                </v-card-text>
                <v-spacer></v-spacer>
                <v-card-actions style="justify-content: center">
                    <v-btn @click="startApp()" color="primary" type="submit">{{$t('EmailVerification.startApp')}}</v-btn>
                </v-card-actions>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import userService from "@/services/UserService";
export default {
  name: "EmailVerification",
  data() {
    return {
      isVerified: false
    };
  },
  methods: {
    checkEmailVerified() {
      //TODO check email verified
      this.isVerified = true;
    },
    startApp() {
      window.$router.push("/profile");
    }
  }
};
</script>