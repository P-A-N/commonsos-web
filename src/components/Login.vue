<template>
  <v-card>

    <v-toolbar app dark color="primary">
      <v-toolbar-title>{{$t('Login.title')}}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-alert type="error" value="true" v-if="error">{{error}}</v-alert>

    <v-card-text>
      <v-form>
        <v-text-field prepend-icon="person" v-model="username" :label="$t('Login.username')" type="text"
                      :error-messages="errors.collect('username')"
                      v-validate="'required'"
                      data-vv-name="username"/>
        <v-text-field prepend-icon="lock" v-model="password" :label="$t('Login.password')" type="password"
                      :error-messages="errors.collect('password')"
                      v-validate="'required'"
                      data-vv-name="password"/>
        <v-layout align-end justify-end>
          <v-btn flat right color="red" :to="'/passwordresetemail'">{{$t('Login.forgotPassword')}}</v-btn>
        </v-layout>
      </v-form>

      <div v-if="showTestUsernames">
        <small>Kaga community:
          <span v-for="(password, username) in kagaUsers">
            <a href="#" @click.prevent="setUser(username, password)">{{username}}</a> |
          </span>
        </small>
        <br>
        <small>Shibuya community:
          <span v-for="(password, username) in shibuyaUsers">
            <a href="#" @click.prevent="setUser(username, password)">{{username}}</a> |
          </span>
        </small>
        <br>
        <small>Commons Inc community:
          <span v-for="(password, username) in commonsIncUsers">
            <a href="#" @click.prevent="setUser(username, password)">{{username}}</a> |
          </span>
        </small>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn flat color="primary" to="/create-account">{{$t('Login.createAccount')}}</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click.prevent="login()">{{$t('Login.login')}}</v-btn>
    </v-card-actions>
    <v-card-text>
      <p class="text-xs-center ma-2">
        <a href="#" @click="toggleLanguage()">{{$t('Login.toggleLanguage')}}</a>
      </p>
    </v-card-text>
  </v-card>

</template>

<script>
import userService from "@/services/UserService";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      error: null,
      kagaUsers: {
        worker: "secret00",
        elderly1: "secret00",
        elderly2: "secret00",
        admin: "secret00"
      },
      shibuyaUsers: {
        admin2: "secret02"
      },
      commonsIncUsers: {
        admin3: "secret03"
      },
      showTestUsernames: process.env.NODE_ENV !== "production"
    };
  },
  methods: {
    login() {
      this.$validator.validateAll().then(valid => {
        if (!valid) return;
        userService
          .login(this.username, this.password)
          .catch(e => (this.error = "Invalid username or password"));
      });
    },
    setUser(username, password) {
      this.username = username;
      this.password = password;
    },
    toggleLanguage() {
      let newLocale = this.$i18n.locale === "en" ? "jp" : "en";
      this.$i18n.locale = newLocale;
      let momentLocale = { jp: "ja", en: "en" };
      this.$moment.locale(momentLocale[newLocale]);
    }
  }
};
</script>