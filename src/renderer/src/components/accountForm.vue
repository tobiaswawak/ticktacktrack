

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
