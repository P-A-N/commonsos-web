<template>
  <div>
    <app-toolbar :title="counterParty.fullName">
      <v-btn slot="left" icon @click.prevent="closeModal()">
        <v-icon>arrow_back</v-icon>
      </v-btn>
    </app-toolbar>

    <v-list two-line>
      <template v-for="(item, index) in messages">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <avatar :user="counterParty"/>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{item.createdAt | moment('from')}}</v-list-tile-title>
            <v-list-tile-sub-title v-html="item.message"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
      <v-divider></v-divider>
    </v-list>

    <v-container>
      <v-layout row wrap>
        <v-flex>
          <form @submit.prevent="sendMessage()" fixed bottom>
            <v-chip small v-if="ad">
              Ad: {{ad.title}}
            </v-chip>
            <v-text-field v-model="message" :label="$t('MessageThread.message')" type="text" auto-grow multi-line/>
            <v-btn type="submit" color="primary">{{$t('MessageThread.send')}}</v-btn>
          </form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import AppToolbar from '@/components/AppToolbar'
  import Avatar from '@/components/Avatar'

  export default {
    name: 'MessageThread',
    components: {
      AppToolbar, Avatar
    },
    props: ['closeModal', 'ad'],
    data() {
      return {
        message: "",
        counterParty: null,
        messages: [
          { message: 'Hello my friend', userId: 1, createdAt: '2018-04-07T20:51:00'},
          { message: 'Hi!', userId: 0, createdAt: '2018-04-09T21:51:00'},
          { message: 'Good to see you', userId: 1, createdAt: '2018-04-09T22:01:00'},
          ]
      }
    },
    methods: {
      sendMessage() {
        this.messages.push({message: this.title, createdAt: new Date(), userId: 'worker'})
        this.message = ""
      }
    },
    created() {
      this.counterParty = this.ad.createdBy
    }
  }
</script>
