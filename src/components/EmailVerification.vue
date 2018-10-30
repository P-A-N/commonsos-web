<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card-text>
                    <p class="text-xs-center">
                        {{$t('EmailVerification.hintStart')}}
                    </p>
                </v-card-text>
                <v-spacer></v-spacer>
                <v-card-actions style="justify-content: center">
                    <v-btn @click="onPressOK()" color="primary" type="submit">{{$t('EmailVerification.ok')}}</v-btn>
                </v-card-actions>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
  name: "EmailVerification",
  methods: {
    onPressOK() {
      window.$router.push("/login");
    }
  }
};
</script>