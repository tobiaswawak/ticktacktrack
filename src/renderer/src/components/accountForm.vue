

<template>
  <!-- Anzeige des ausgewählten Profilbilds -->
  <v-row class="mt-5">
    <!-- Profilbild -->
    <v-col
      cols="1"
      class="ml-5"
    >
      <v-avatar size="100">
        <img
          :src="selectedImage"
          v-if="selectedImage"
          alt="Profilbild"
        >
        <v-icon
          v-else
          size="80"
        >
          mdi-account-circle
        </v-icon>
      </v-avatar>
    </v-col>

    <!-- Eingabefeld für die Profilbildauswahl -->
    <v-col
      cols="10"
      align-self="center"
    >
      <v-btn
        v-model="selectedImage"
        accept="image/*"
        color="primary"
      >
        Profilbild hochladen
      </v-btn>
    </v-col>
  </v-row>

  <v-form class="mt-5">
    <v-row class="mx-5">
      <v-col cols="6">
        <v-text-field
          label="Vorname"
          type="input"
          required
          variant="outlined"
          color="primary"
          prepend-icon="mdi-rename-outline"
        />
      </v-col>

      <v-col cols="6">
        <v-text-field
          label="Nachname"
          type="input"
          required
          variant="outlined"
          color="primary"
        />
      </v-col>
    </v-row>

    <v-row class="mx-5">
      <v-col cols="12">
        <v-text-field
          label="E-Mail"
          type="email"
          required
          variant="outlined"
          color="primary"
          prepend-icon="mdi-email-outline"
        />
      </v-col>
    </v-row>


    <v-row class="mx-5">
      <v-col cols="6">
        <v-text-field
          label="Jobtitel"
          type="input"
          required
          variant="outlined"
          color="primary"
          prepend-icon="mdi-briefcase-outline"
        />
      </v-col>

      <v-col cols="6">
        <v-text-field
          label="Arbeitsstunden"
          type="number"
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
      <v-col cols="auto">
        <v-btn
          type="reset"
          color="secondary"
          variant="outlined"
          prepend-icon="mdi-window-close"
        >
          Reset
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>


<script setup>
import { ref } from "vue";

const selectedImage = ref(null);
</script>

<style scoped>
v-form {
  transition: all 0.3s ease;
}
</style>
