<template>
  <div class="profile-container mt-5 ml-5">
    <div class="profile-info d-flex align-center justify-space-around ma-5">
      <v-avatar size="80">
        <v-img
          alt="Profilbild"
          src="/src/images/Max_Mustermann.jpg"
          color="surface-variant"
        />
      </v-avatar>
      <v-card-title
        v-model="name"
        class="text-h5"
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
      mdi-account-tie
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
      mdi-briefcase
    </v-icon>

    <v-card-title class="text-h6 my-2 ml-3">
      {{ hours }}
    </v-card-title>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useSaveAccountData} from "../stores/saveAccountData.js";
const name = ref("")
const job = ref("")
const hours = ref("")
const saveAccountData = useSaveAccountData();
const data = saveAccountData.accountData[0];
name.value = data.firstName +" "+ data.lastName;
job.value = data.jobTitle;
hours.value = data.workingHours + " Stunden";




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