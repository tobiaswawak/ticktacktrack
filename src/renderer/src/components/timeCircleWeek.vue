<template>
  <v-card-title class="text-h5 my-2">
    Meine Woche
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
      {{ progressHours }} / 40 h
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted} from "vue";
import {useSaveTimeStore} from "../stores/saveTimeStore.js";

const saveTimeStore = useSaveTimeStore();

const progressValue = ref(0);
const progressHours = ref(0);

onMounted(() => {
  calculateWeekHours();
});

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
  width: 50% ;
  text-align: center;
  font-size: 45px;
  justify-content: center;
}
</style>
