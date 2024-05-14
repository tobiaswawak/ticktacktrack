<template>
  <v-form
    lazy-validation
    ref="form"
    class="mt-5"
  >
    <v-avatar
      class="ma-5 ml-9"
      size="75"
    >
      <!-- Wenn ein Bild vorhanden ist, zeige es an -->
      <v-img
        v-if="userdata.image !== null"
        :src="userdata.image"
      />

      <!-- Wenn kein Bild vorhanden ist, zeige das Standardbild an -->
      <v-img
        v-else
        src="/src/images/default_Avatar.jpg"
      />
    </v-avatar>

    <v-row class="mx-5">
      <v-col cols="12">
        <v-file-input
          v-model="image"
          accept="image/*"
          color="primary"
          label="Profilbild auswählen"
          variant="outlined"
        />
      </v-col>
    </v-row>

    <v-row class="mx-5">
      <v-col cols="6">
        <v-text-field
          v-model="userdata.firstName"
          label="Vorname"
          type="text"
          :rules="rules"
          required
          variant="outlined"
          color="primary"
          prepend-icon="mdi-account-edit-outline"
        />
      </v-col>

      <v-col cols="6">
        <v-text-field
          v-model="userdata.lastName"
          label="Nachname"
          type="input"
          :rules="rules"
          required
          variant="outlined"
          color="primary"
        />
      </v-col>
    </v-row>

    <v-row class="mx-5">
      <v-col cols="6">
        <v-text-field
          v-model="userdata.jobTitle"
          label="Jobtitel"
          type="text"
          :rules="rules"
          required
          variant="outlined"
          color="primary"
          prepend-icon="mdi-briefcase-outline"
        />
      </v-col>

      <v-col cols="6">
        <v-text-field
          v-model="userdata.workingHours"
          label="Arbeitsstunden pro Woche"
          type="number"
          :rules="rules"
          required
          variant="outlined"
          color="primary"
        />
      </v-col>
    </v-row>

    <v-row
      justify="center"
      class="mb-5"
    >
      <v-col cols="auto">
        <v-btn
          border
          @click="saveUserData"
          color="primary"
        >
          Speichern
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>


<script setup>
import { onMounted, ref } from "vue";
import { useSaveAccountData } from "../stores/saveAccountData.js";

const saveAccountData = useSaveAccountData();
const form = ref(null);
let userdata = ref({});
let image = ref(null);

const rules = [
  value => {
    if (value) return true;
    return "Bitte eintragen";
  },
];




onMounted(() => {
  if (saveAccountData.accountData) {
    userdata.value = { ...saveAccountData.accountData };
  }
});

const saveUserData = () => {
  // Speichere die Benutzerdaten im Store
  saveAccountData.accountData = { ...userdata.value };

  // Speichere das ausgewählte Bild im Store
  if (image.value) {
    saveAccountData.accountData.image = URL.createObjectURL(image.value);
  }
};
</script>

<style scoped>

</style>
