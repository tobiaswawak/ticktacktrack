<script setup>

</script>

<template>
  <div class="text-center pa-5">
    <!-- Anzeige des ausgewählten Profilbilds -->
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

    <!-- Eingabefeld für die Profilbildauswahl -->
    <v-file-input
      v-model="selectedImage"
      accept="image/*"
      label="Profilbild wählen"
      variant="outlined"
      color="primary"
      outlined
      prepend-icon="mdi-camera-outline"
    />
  </div>

  <v-card>
    <v-form class="pa-5">
      <v-row>
        <v-col cols="12">
          <v-text-field
            label="Jobtitel"
            type="input"
            required
            variant="outlined"
            color="primary"
            prepend-icon="mdi-briefcase-outline"
          />
        </v-col>
      </v-row>

      <v-row>
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

      <v-row>
        <v-col cols="12">
          <v-text-field
            label="E-Mail"
            type="input"
            required
            variant="outlined"
            color="primary"
            prepend-icon="mdi-email-outline"
          />
          <v-icon />
        </v-col>
      </v-row>

      <v-row justify="center">
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
  </v-card>
</template>

<style scoped>

</style>
