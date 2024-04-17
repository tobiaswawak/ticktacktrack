<template>
  <v-app>
    <!-- Navigation -->
    <v-navigation-drawer
      class="background"
    >
      <v-list>
        <v-list-item>
          <img
            src="../images/Logo-blau-mitSchrift.png"
            height="115px"
          >
        </v-list-item>

        <v-list-item
          prepend-icon="mdi-timer-plus-outline"
          title="Zeit erfassen"
          value="addTime"
          href="/"
          class="ml-5"
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
