<template>
    <v-container fluid fill-height>
        <v-layout v-if="!isPassSent" align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card-text>
                    <p class="text-xs-center">
                        {{$t('PasswordResetInput.inputHint')}}
                    </p>
                </v-card-text>

                <v-text-field style="margin-top: 16px" prepend-icon="lock" v-model="password" :label="$t('PasswordResetInput.pass')"
                      :error-messages="errors.collect('password')"
                      :hint="$t('CreateAccount.passwordHint')"
                      :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (hidePassword = !hidePassword)"
                      :type="hidePassword ? 'password' : 'text'"
                      counter="50"
                      name="password"
                      v-validate="'required|min:8'"
                      data-vv-name="password"/>

                <v-text-field prepend-icon="lock" v-model="password2" :label="$t('PasswordResetInput.passConfirm')"
                      :error-messages="errors.collect('password2')"
                      :hint="$t('CreateAccount.password2Hint')"
                      :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (hidePassword = !hidePassword)"
                      :type="hidePassword ? 'password' : 'text'"
                      counter="50"
                      v-validate="'required|confirmed:password'"
                      data-vv-name="password2"/>

                <v-card-actions style="justify-content: center; margin-top: 16px">
                    <v-btn color="primary" @click="checkEmailVerified()" type="submit">{{$t('EmailVerification.ok')}}</v-btn>
                </v-card-actions>
            </v-flex>
        </v-layout>
        <v-layout column v-if="isPassSent" align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card-text >
                    <p class="text-xs-center">
                        {{$t('PasswordResetInput.resetHint')}}
                    </p>
                </v-card-text>
                <v-spacer></v-spacer>
                <v-card-actions style="justify-content: center">
                    <v-btn @click="startApp()" color="primary"  type="submit">{{$t('EmailVerification.startApp')}}</v-btn>
                </v-card-actions>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import userService from "@/services/UserService";
export default {
  name: "PasswordResetInput",
  data() {
    return {
      isPassSent: false,
      password: null,
      password2: null,
      hidePassword: true
    };
  },
  methods: {
    checkEmailVerified() {
      //TODO send password
      this.$validator.validateAll().then(valid => {
        if (!valid) return;
        this.isPassSent = true;
      });
    },
    startApp() {
      window.$router.push("/login");
    }
  }
};
</script>