<template>
  <div class="ma-5 ml-7 mt-6">
    <v-avatar size="75">
      <v-img
        v-if="userdata.image !== null"
        :src="userdata.image"
      />

      <v-img
        v-else
        src="/src/images/default_Avatar.jpg"
      />
    </v-avatar>
    <v-btn
      v-if="userdata.image !== null"
      icon="mdi-trash-can"
      border
      @click="deleteProfileImg()"
      class="ml-6"
    />
    <v-file-input
      v-else
      v-model="image"
      accept="image/*"
      color="primary"
      variant="outlined"
      label="Profilbild auswählen"
      class="mt-6"
    >
      <template #append>
        <v-btn
          border
          @click="saveImg()"
          class="mr-3"
        >
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
      </template>
    </v-file-input>
  </div>

  <v-form
    lazy-validation
    ref="form"
    class="mt-5"
  >
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
let userdata = ref({})
let image = ref(null)
const rules = [
  value => {
    if (value) return true;
    return "Bitte eintragen";
  },
];
onMounted(() => {
  userdata.value = saveAccountData.accountData;
});

const deleteProfileImg = () => {
  saveAccountData.accountData.image = null
}

const saveUserData = () => {
  saveAccountData.accountData = userdata.value
}

const saveImg = () => {
  userdata.value.image = URL.createObjectURL(image.value)
  image.value = null
}


</script>

<style scoped>
v-form {
  transition: all 0.3s ease;
}
</style>
