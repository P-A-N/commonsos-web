<template>
  <v-select
    :items="users"
    :rules="[() => selected.length > 0 || $t('SelectGroupMembers.noMembersSelected')]"
    :search-input.sync="search"
    v-model="selected"

    chips
    deletable-chips

    item-text="username"
    item-value="id"

    return-object

    :label="$t('SelectGroupMembers.selectMembers')"
    autocomplete
    multiple
    cache-items>

    <template slot="selection" slot-scope="data">
      <v-chip
        :selected="data.selected"
        :key="JSON.stringify(data.item)"
        :close="isNewMember(data.item)"
        class="chip--select-multi"
        @input="data.parent.selectItem(data.item)">

        <avatar :user="data.item"/>
        {{ data.item.username }}
      </v-chip>
    </template>

    <template slot="item" slot-scope="data">
      <template v-if="typeof data.item !== 'object'">
        {{$t('SelectGroupMembers.searchResultEmpty')}}
      </template>
      <template v-else>
        <v-list-tile-avatar>
          <avatar :user="data.item"/>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-html="data.item.username"></v-list-tile-title>
        </v-list-tile-content>
      </template>
    </template>

  </v-select>
</template>

<script>
import gateway from "@/gateway";
import Avatar from "@/components/Avatar";

export default {
  name: "SelectGroupMembers",
  props: ["existingMembers", "memberSelected", "communityId"],
  components: { Avatar },
  data() {
    return {
      users: [],
      filter: "",
      search: null,
      selected: []
    };
  },
  watch: {
    search(val) {
      val && this.communityId && this.loadUsers(val);
    },
    selected: function(val) {
      const finalSet = this.includeExistingUsers(val);
      if (this.memberSelected) this.memberSelected(finalSet);
    }
  },
  methods: {
    isNewMember: function(member) {
      return !this.existingMembers.find(em => em.id === member.id);
    },
    includeExistingUsers: function(val) {
      this.existingMembers.forEach(em => {
        if (!val.find(i => i.id === em.id)) val.push(em);
      });
      return val;
    },
    loadUsers: function(query) {
      gateway
        .get(`/users?communityId=${this.communityId}&q=` + encodeURI(query))
        .then(r => {
          this.users = r.data;
        });
    }
  },
  created() {
    this.selected = this.existingMembers;
    this.users = this.existingMembers;
  }
};
</script>