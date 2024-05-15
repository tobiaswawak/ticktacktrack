<template>
  <v-navigation-drawer
    class="border-none ma-2"
    permanent
  >
    <img
      src="/src/images/logo-final.png"
      width="180px"
      class="mt-8  mb-1 ml-1"
    >
    <v-list>
      <v-list-item
        prepend-icon="mdi-home"
        title="Home"
        value="addTime"
        class="my-5 ml-2 rounded-lg"
        @click="selectItem('home')"
        :class="{ 'active-item': selectedItem === 'home' }"
        :disabled="disableItems()"
      />

      <v-list-item
        prepend-icon="mdi-timer-plus"
        title="Zeit erfassen"
        value="addTime"
        class="my-5  ml-2 rounded-lg"
        @click="selectItem('timeTrack')"
        :class="{ 'active-item': selectedItem === 'timeTrack' }"
        :disabled="disableItems()"
      />

      <v-list-item
        prepend-icon="mdi-account"
        title="Mein Account"
        value="account"
        class="rounded-lg  ml-2 "
        @click="selectItem('account')"
        :class="{ 'active-item': selectedItem === 'account' }"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import {useSaveAccountData} from "../stores/saveAccountData.js";

let selectedItem = ref("name")
const route = useRoute()
const saveAccountData =  useSaveAccountData()


onMounted(() => {
  selectedItem.value = route.name
});



const router = useRouter()
const selectItem = (name) => {
  router.push(name)
  selectedItem.value = name
}

const disableItems = () => {
  const data = saveAccountData.accountData;
  const {firstName, lastName, jobTitle, workingHours} = data;
  return !firstName || !lastName || !jobTitle || !workingHours;
}

</script>

<style scoped>
.active-item {
  background-color: #4271bf;
  color: white;
}
</style>
