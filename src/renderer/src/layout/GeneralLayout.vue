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
  const data = saveAccountData.accountData;
  if (Object.keys(saveAccountData.accountData).length === 0) {
    if(data.firstName !== null && data.lastName !== null && data.jobTitle !== null && data.workingHours !== null) {
      router.push({name: "account"})
    }
  }



});

</script>

<style lang="css">

html {
  overflow-y: auto
}


</style>
