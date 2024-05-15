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
        :variant="getVariant('home')"
        :class="{ 'active-item': selectedItem === 'home' }"
      />

      <v-list-item
        prepend-icon="mdi-timer-plus"
        title="Zeit erfassen"
        value="addTime"
        class="my-5  ml-2 rounded-lg"
        @click="selectItem('timeTrack')"
        :class="{ 'active-item': selectedItem === 'timeTrack' }"
      />

      <v-list-item
        prepend-icon="mdi-account"
        title="Mein Account"
        value="account"
        class="rounded-lg  ml-2 "
        @click="selectItem('account')"
        :variant="getVariant('account')"
        :class="{ 'active-item': selectedItem === 'account' }"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";

let selectedItem = ref("name")
const route = useRoute()

onMounted(() => {
  selectedItem.value = route.name
});

const getVariant = (name) => {
  if (name === selectedItem.value) {
    return "";
  } else {
    return null
  }
}

const router = useRouter()
const selectItem = (name) => {
  router.push(name)
  selectedItem.value = name
}

</script>

<style scoped>
.active-item {
  background-color: #4271bf;
  color: white;
}
</style>
