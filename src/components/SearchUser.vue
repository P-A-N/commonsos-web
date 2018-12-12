<template>
  <div>
    <app-toolbar title="Admin"></app-toolbar>

    <v-subheader>Top-up users</v-subheader>

    <div class="px-3">
      <v-text-field v-model="keyword" :label="$t('SearchUser.search')" type="text"
                    @change="loadUsers()"
                    @keyup="loadUsers()"/>
    </div>

    <v-list v-if="users.length" three-line>
      <template v-for="(user, index) in users">
        <v-list-tile class="user" @click="showProfile(user)">
          <v-layout align-center row>
            <v-flex xs3>
              <avatar :user="user"/>
            </v-flex>

            <v-flex>
              <div class="title">{{user.username}}</div>
            </v-flex>

            <v-flex mr-3 xs1>
              <v-icon>keyboard_arrow_right</v-icon>
            </v-flex>
          </v-layout>

        </v-list-tile>
        <v-divider v-if="index + 1 < users.length"></v-divider>
      </template>
    </v-list>

    <app-bottom-nav></app-bottom-nav>

  </div>
</template>

<script>
import AppToolbar from "@/components/AppToolbar";
import AppBottomNav from "@/components/AppBottomNav";
import Avatar from "@/components/Avatar";
import gateway from "@/gateway";
import LoggedInUserConsumerMixin from "@/LoggedInUserConsumerMixin";
import userService from "@/services/UserService";

export default {
  name: "SearchUser",
  mixins: [LoggedInUserConsumerMixin],
  components: {
    Avatar,
    AppToolbar,
    AppBottomNav
  },
  data() {
    return {
      keyword: null,
      users: [],
      debounceTimer: null,
      communityId: null
    };
  },
  methods: {
    loadUsers: function() {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(
        () =>
          gateway
            .get(
              `/users?communityId=${this.communityId}&q=` +
                encodeURI(this.keyword)
            )
            .then(r => (this.users = r.data)),
        300
      );
    },
    showProfile: function(user) {
      userService.setUserAdmin(true);
      var adId = null;
      this.$router.push(
        "/profile/" + user.id + "/" + this.communityId + `/${adId}`
      );
    }
  },
  created() {
    this.communityId = this.user.communityList.filter(
      item => item.adminUserId === this.user.id
    )[0].id;
  }
};
</script>
