<template>
  <v-card-title class="text-h5 my-2">
    Meine Woche - {{ getWeekLabel() }}
  </v-card-title>

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
import { ref, onMounted } from "vue";
import { useSaveTimeStore } from "../stores/saveTimeStore.js";
import { useSaveAccountData } from "../stores/saveAccountData.js";
const hours = ref("");

const saveTimeStore = useSaveTimeStore();
const saveAccountData = useSaveAccountData();
const data = saveAccountData.accountData;

hours.value = data.workingHours;

const progressValue = ref(0);
const progressHours = ref(0);

onMounted(() => {
  calculateWeekHours();
});

const getWeekLabel = () => {

    const now = new Date();
    const onejan = new Date(now.getFullYear(), 0, 1);
    const week = Math.ceil( (((now - onejan) / 86400000) + onejan.getDay() + 1) / 7 );
    return "KW " + week;

};

const calculateWeekHours = () => {
  const currentDate = new Date();
  const firstDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

  let totalHours = 0;
  saveTimeStore.timestore.forEach(item => {
    const itemDate = new Date(item.date);
    if (itemDate >= firstDayOfWeek && itemDate <= lastDayOfWeek) {
      const workedTime = parseFloat(item.workedTime.replace("h", ""));
      totalHours += workedTime;
    }
  });

  progressValue.value = totalHours * 100 / 40;
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
