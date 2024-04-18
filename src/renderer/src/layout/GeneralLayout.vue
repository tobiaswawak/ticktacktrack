<template>
  <v-app>
    <!-- Navigation -->
    <sidebar />
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup>


import Sidebar from "../components/sidebar.vue";
</script>

<style lang="css" setup>

html {
  overflow-y: auto
}


</style>
