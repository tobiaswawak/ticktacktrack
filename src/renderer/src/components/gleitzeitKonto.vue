<template>
  <div class="title-container ml-10 py-4">
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
      <p>{{ totalOvertime }} Stunden</p>
    </div>
  </div>
</template>

<script setup>
import { useSaveTimeStore } from "../stores/saveTimeStore.js";
import { onMounted, ref } from "vue";

const saveTimeStore = useSaveTimeStore();
const totalOvertime = ref("");

onMounted(() => {
  calculateTotalOvertime();
});

const calculateTotalOvertime = () => {
  let total = 0;
  saveTimeStore.timestore.forEach(item => {
    // Überprüfen, ob item.overtime eine gültige Zahl ist
    if (!isNaN(parseFloat(item.overtime))) {
      total += parseFloat(item.overtime);
    }
  });
  totalOvertime.value = total.toFixed(2); // Aktualisiere den Wert von totalOvertime
};
</script>

<style scoped>
.title-container {
  display: flex;
  align-items: center;
}

.hours-container {
  margin-left: auto; /* Bewegt die Stunden nach rechts */
}
</style>
