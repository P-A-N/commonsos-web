<template>
  <v-bottom-nav fixed :value="true" app>
    <v-btn to="/wallet">
      <span>Wallet</span>
      <v-icon>account_balance_wallet</v-icon>
    </v-btn>
    <v-btn to="/community">
      <span>Community</span>
      <v-icon>people</v-icon>
    </v-btn>
    <v-btn to="/messages">
      <span>Messages</span>
      <v-icon>message</v-icon>
    </v-btn>
    <v-btn to="/profile">
      <span>Profile</span>
      <v-icon>person</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>