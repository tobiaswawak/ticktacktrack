<template>
  <div class="title-container ml-10">
    <v-icon
      color="primary"
      size="35"
    >
      mdi-poll
    </v-icon>

    <v-card-title class="text-h5 my-2 ml-3">
      Gleitzeitkonto
    </v-card-title>

    <div class="hours-container mr-8">
      <p>{{ overtime }} Gleitzeit</p>
    </div>
  </div>
</template>

<script setup>
import { useSaveTimeStore } from "../stores/saveTimeStore.js";
import { computed } from "vue";

const saveTimeStore = useSaveTimeStore();

const totalHours = computed(() => {
  return saveTimeStore.timestore.reduce((total, item) => {
    return total + parseFloat(item.workedTime.replace("h", ""));
  }, 0);
});

const overtime = computed(() => {
  const standardHours = 40; // Standard-Arbeitsstunden pro Woche
  const totalWorkedHours = totalHours.value;
  return totalWorkedHours > standardHours ? totalWorkedHours - standardHours : 0;
});
</script>

<style scoped>
.title-container {
  display: flex;
  align-items: center;
}

.hours-container {
  margin-left: auto; /* Pushes the hours to the right */
}
</style>
