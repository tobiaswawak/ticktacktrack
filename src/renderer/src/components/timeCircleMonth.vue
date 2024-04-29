<template>
  <v-card-title class="text-h5 my-2">
    Monatsreport
  </v-card-title>

  <div class="text-right ma-5">
    <v-progress-circular
      :model-value="progressValue"
      :rotate="360"
      :size="200"
      :width="30"
      color="primary"
    >
      {{ progressHours }} / 160h
    </v-progress-circular>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useSaveTimeStore } from "../stores/saveTimeStore.js";

const saveTimeStore = useSaveTimeStore();
const progressValue = ref(0);
const progressHours = ref(0);

onMounted(() => {
  calculateMonthHours();
});

const calculateMonthHours = () => {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  let totalHours = 0;
  saveTimeStore.timestore.forEach(item => {
    const itemDate = new Date(item.date);
    if (itemDate >= firstDayOfMonth && itemDate <= lastDayOfMonth) {
      const workedTime = parseFloat(item.workedTime.replace("h", ""));
      totalHours += workedTime;
    }
  });

  progressValue.value = totalHours * 100 / 160;
  progressHours.value = totalHours;
};

</script>

<style scoped>
</style>
