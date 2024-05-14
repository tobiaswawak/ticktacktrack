<template>
  <v-card-title class="text-h5 my-2">
    Mein Monat - {{ getMonthLabel() }}
  </v-card-title>
  <v-divider />

  <div class="progress-container ma-5">
    <v-progress-circular
      :model-value="progressValue"
      :rotate="360"
      :size="200"
      :width="30"
      color="primary"
    />
    <div class="progress-hours">
      {{ progressHours }} / {{ hours }}h
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useSaveTimeStore} from "../stores/saveTimeStore.js";
import {useSaveAccountData} from "../stores/saveAccountData.js";

const hours = ref("");

const saveTimeStore = useSaveTimeStore();
const saveAccountData = useSaveAccountData();
const data = saveAccountData.accountData;

const progressValue = ref(0);
const progressHours = ref(0);

hours.value = data.workingHours * 4;

onMounted(() => {
  calculateMonthHours();
});

const getMonthLabel = () => {
  const options = { month: "long" };
  return new Date().toLocaleDateString("de-DE", options);
};

const calculateMonthHours = () => {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

  let totalHours = 0;
  saveTimeStore.timestore.forEach(item => {
    const itemDate = new Date(item.date);
    if (itemDate >= firstDayOfMonth && itemDate <= lastDayOfMonth) {
      const workedTime = parseFloat(item.workedTime.replace("h", ""));
      totalHours += workedTime;
    }
  });

  progressValue.value = totalHours * 100 / (hours.value);
  progressHours.value = totalHours.toFixed(2);
};

</script>

<style scoped>
.progress-container {
  display: flex;
  align-items: center;
}

.progress-hours {
  margin-left: 10%;
  width: 50%;
  text-align: center;
  font-size: 45px;
  justify-content: center;
}
</style>
