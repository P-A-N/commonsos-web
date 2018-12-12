<template>
    <v-container fluid fill-height>
        <v-layout v-if="!isEmailSent" align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card-text>
                    <p class="text-xs-center">
                        {{$t('PasswordResetEmail.emailHint')}}
                    </p>
                </v-card-text>

                <v-text-field prepend-icon="email" v-model="email" :label="$t('PasswordResetEmail.emailAddress')" type="text"
                    :error-messages="errors.collect('email')"
                    v-validate="'required|email'"
                    data-vv-name="email"/>
                <v-card-actions style="justify-content: center">
                    <v-btn color="primary" @click="checkEmailVerified()" type="submit" :disabled="loading">{{$t('EmailVerification.ok')}}</v-btn>
                </v-card-actions>
            </v-flex>
        </v-layout>
        <v-layout column v-if="isEmailSent" align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card-text >
                    <p class="text-xs-center">
                        {{$t('PasswordResetEmail.emailSent')}}
                    </p>
                </v-card-text>
                <v-spacer></v-spacer>
                <v-card-actions style="justify-content: center">
                    <v-btn @click="changePassword()" color="primary"  type="submit" >{{$t('EmailVerification.startApp')}}</v-btn>
                </v-card-actions>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import userService from "@/services/UserService";
import gateway from "@/gateway";
export default {
  name: "PasswordResetEmail",
  data() {
    return {
      email: "",
      isEmailSent: false,
      loading: false
    };
  },
  methods: {
    checkEmailVerified() {
      this.$validator.validateAll().then(valid => {
        if (!valid) return;
        this.loading = true;
        gateway
          .post(`/passwordreset`, { emailAddress: this.email })
          .then(r => {
            this.loading = false;
            this.isEmailSent = true;
          })
          .catch(err => {
            this.loading = false;
          });
      });
    },
    changePassword() {
      //   var userAgent = navigator.userAgent || navigator.vendor || window.opera;
      //   if (/android/i.test(userAgent)) {
      //     window.open(
      //       "intent://app.commons.love/#Intent;scheme=launch;package=app.commons.love;S.content=WebContent;end"
      //     );
      //   } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      //     window.open("commonsCustonUrl://");
      //   } else {
      window.$router.push("/login");
      //   }
    }
  }
};
</script>