<template>
  <v-app>
    <v-app-bar
      density="compact"
      clipped-left
      :elevation="1"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />
    </v-app-bar>
    <v-navigation-drawer
      clipped
      v-model="drawer"
    />
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup>
import {ref} from "vue";

let drawer = ref(true)


</script>
