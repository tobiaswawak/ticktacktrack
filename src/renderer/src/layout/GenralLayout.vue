<template>
  <v-app>
    <!-- Navigation -->
    <v-navigation-drawer
      class="background"
    >
      <v-list>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/86.jpg"
          title="Tick Tack Track"
          class="ma-5"
        />

        <v-list-item
          prepend-icon="mdi-timer-plus-outline"
          title="Zeit erfassen"
          value="addTime"
          href="/"
          class="ma-5"
        />

        <v-list-item
          prepend-icon="mdi-account-outline"
          title="Mein Account"
          value="account"
          href="/account"
          class="ma-5"
        />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup>


</script>

<style setup>
html {
  overflow-y: auto
}


</style>
