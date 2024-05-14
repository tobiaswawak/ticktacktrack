<template>
  <v-card-title
    class="text-h5 my-2"
    center
  >
    Mein Profil
  </v-card-title>
  <v-divider />
  <div class="profile-container mt-3 ml-5">
    <div class="profile-info d-flex align-center justify-space-around ma-5">
      <v-avatar size="80">
        <v-img :src="image" />
      </v-avatar>
      <v-card-title
        v-model="name"
        class="text-h5"
        v-if="image !== null"
      >
        {{ name }}
      </v-card-title>
    </div>
  </div>
  <div class="title-container ml-13">
    <v-icon
      color="primary"
      size="35"
    >
      mdi-account-tie-outline
    </v-icon>

    <v-card-title class="text-h6 my-2 ml-3">
      {{ job }}
    </v-card-title>
  </div>

  <div class="title-container ml-13">
    <v-icon
      color="primary"
      size="35"
    >
      mdi-briefcase-outline
    </v-icon>

    <v-card-title class="text-h6 my-2 ml-3">
      {{ hours }}
    </v-card-title>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useSaveAccountData } from "../stores/saveAccountData.js";
const name = ref("")
const job = ref("")
const hours = ref("")
const image = ref("")
const saveAccountData = useSaveAccountData();
const data = saveAccountData.accountData;
name.value = data.firstName + " " + data.lastName;
job.value = data.jobTitle;
hours.value = data.workingHours + " Stunden";
image.value = data.image;

</script>

<style scoped>
.profile-container {
  display: flex;
  align-items: center;
}

.profile-info {
  display: flex;
  align-items: center;
}


.title-container {
  display: flex;
  align-items: center;
}
</style>
