<template>
  <div class="ma-5 ml-7">
    <v-avatar size="80">
      <v-img
        alt="Profilbild"
        src="/src/images/Max_Mustermann.jpg"
        color="surface-variant"
      />
    </v-avatar>

    <v-btn
      v-model="selectedImage"
      accept="image/*"
      color="primary"
      class="ml-7"
    >
      Profilbild hochladen
    </v-btn>
  </div>

  <v-form
    @submit.prevent="saveAccount"
    lazy-validation
    ref="form"
    class="mt-5"
  >
    <v-row class="mx-5">
      <v-col cols="6">
        <v-text-field
          v-model="firstName"
          label="Vorname"
          type="text"
          :rules="rules"
          required
          variant="outlined"
          color="primary"
          prepend-icon="mdi-rename-outline"
        />
      </v-col>

      <v-col cols="6">
        <v-text-field
          v-model="lastName"
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
          v-model="jobTitle"
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
          v-model="workingHours"
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
          type="submit"
          color="primary"
          prepend-icon="mdi-check"
        >
          Speichern
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>


<script setup>
import {ref} from "vue";
import {useSaveAccountData} from "../stores/saveAccountData.js";
const saveAccountData = useSaveAccountData();
const form = ref(null);
const firstName = ref("")
const lastName = ref("")
const jobTitle = ref("")
const workingHours = ref("")


if (saveAccountData.accountData.length > 0) {
  const data = saveAccountData.accountData[0]; // Annahme: Es gibt nur einen Datensatz
  firstName.value = data.firstName;
  lastName.value = data.lastName;
  jobTitle.value = data.jobTitle;
  workingHours.value = data.workingHours;
}

const rules = [
  value => {
    if (value) return true;
    return "Bitte eintragen";
  },
];

const saveAccount = async () => {
    const valid = await form.value.validate();
  if (valid.valid) {
    saveAccountData.accountData.splice(0, 1, {
      firstName: firstName.value,
      lastName: lastName.value,
      jobTitle: jobTitle.value,
      workingHours: workingHours.value
    });
  }
}

</script>

<style scoped>
v-form {
  transition: all 0.3s ease;
}
</style>
