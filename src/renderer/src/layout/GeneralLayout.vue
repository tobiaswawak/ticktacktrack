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
import {onMounted} from "vue";
import { useSaveAccountData } from "../stores/saveAccountData.js";
import {useRouter} from "vue-router";

const saveAccountData = useSaveAccountData();
const router = useRouter();


onMounted(() => {
  console.log(saveAccountData.accountData)
  if (saveAccountData.accountData) {

    router.push({name:"account"})
  }
});
</script>

<style lang="css">

html {
  overflow-y: auto
}


</style>
