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
  const { firstName, lastName, jobTitle, workingHours } = data;

  // Prüfen, ob alle erforderlichen Felder einen Wert ungleich null haben
  if (!firstName && !lastName && !jobTitle && !workingHours) {
    router.push({ name: "account" });
  }
});

</script>

<style lang="css">

html {
  overflow-y: auto
}


</style>
