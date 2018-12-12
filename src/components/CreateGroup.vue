<template>
  <form>
    <v-card-text>
      <div class="mb-2">
        <v-chip v-if="user">
          <v-avatar>
            <img :src="user.avatarUrl">
          </v-avatar>
          {{ user.username }}
        </v-chip>
        <small>Group creator</small>
      </div>
      <v-select
        :items="user.communityList"
        v-model="communityId"
        item-text="name"
        item-value="id"
        :label="$t('CreateAccount.community')"
        single-line
        data-vv-name="community"
        hide-details
        v-validate="'required'"
        v-on:change="changeCommunity"
      ></v-select>
      <select-group-members :existing-members="[]" :member-selected="memberSelected" :communityId="communityId"/>
      <v-text-field v-model="title" :label="$t('CreateGroup.title')" type="text"/>
    </v-card-text>

    <v-card-actions>
      <small style="text-align: right; color: #555; padding-right: 20px;">{{$t('CreateGroup.createHint')}}</small>

      <v-spacer/>

      <v-btn @click="createGroup()" :disabled="!selected.length" color="primary" right>
        {{$t('CreateGroup.create')}}
      </v-btn>
    </v-card-actions>
  </form>
</template>

<script>
import gateway from "@/gateway";
import SelectGroupMembers from "@/components/SelectGroupMembers";
import LoggedInUserConsumerMixin from "@/LoggedInUserConsumerMixin";

export default {
  name: "CreateGroup",
  mixins: [LoggedInUserConsumerMixin],
  props: ["closeModal"],
  components: { SelectGroupMembers },
  data() {
    return {
      title: "",
      users: [],
      filter: "",
      search: null,
      selected: [],
      communityId: null
    };
  },
  watch: {
    search(val) {
      val && this.loadUsers(val);
    }
  },
  methods: {
    loadUsers: function(query) {
      this.$validator.validateAll().then(valid => {
        gateway
          .get(`/users?communityId=${this.communityId}&q=` + encodeURI(query))
          .then(r => (this.users = r.data));
      });
    },
    memberSelected: function(members) {
      this.selected = members;
    },
    createGroup: function() {
      let memberIds = this.selected.map(u => u.id);
      gateway
        .post("/message-threads/group", { memberIds, title: this.title })
        .then(r => {
          this.closeModal();
          this.$router.push("/messages/" + r.data.id);
        });
    },
    changeCommunity(communityId) {
      this.communityId = communityId;
    }
  }
};
</script>