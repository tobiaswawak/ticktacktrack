<template>
  <v-card-title class="text-h5 my-2">
    Wochenübersicht
  </v-card-title>

  <!-- Zeilen -->
  <v-container>
    <v-row
      v-for="(day, index) in weekDays"
      :key="index"
    >
      <v-col
        cols="5"
        class="my-2"
      >
        <p>{{ getDayLabel(day) }}</p>
      </v-col>
      <v-col
        cols="7"
        class="text-end my-2"
      >
        <p>{{ getFormattedHours(day.hours) }}</p>
      </v-col>
      <v-divider />
    </v-row>
  </v-container>
</template>

<script setup>
import { useSaveTimeStore } from "../stores/saveTimeStore.js";
import { onMounted } from "vue";

const saveTimeStore = useSaveTimeStore();

const currentDate = new Date();
const firstDayOfWeek = new Date(currentDate);
firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1));
const lastDayOfWeek = new Date(firstDayOfWeek);
lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

onMounted(() => {
  getWorkedHours();
});


const weekDays = [
  {name: "Montag", date: new Date(firstDayOfWeek), hours: 0},
  {name: "Dienstag", date: new Date(firstDayOfWeek.getTime() + (24 * 60 * 60 * 1000)), hours: 0},
  {name: "Mittwoch", date: new Date(firstDayOfWeek.getTime() + (2 * 24 * 60 * 60 * 1000)), hours: 0},
  {name: "Donnerstag", date: new Date(firstDayOfWeek.getTime() + (3 * 24 * 60 * 60 * 1000)), hours: 0},
  {name: "Freitag", date: new Date(firstDayOfWeek.getTime() + (4 * 24 * 60 * 60 * 1000)), hours: 0}
];

const getDayLabel = (day) => {
  return day.name + " " + day.date.toLocaleDateString("de-DE");
};

const getWorkedHours = () => {
  saveTimeStore.timestore.forEach(item => {
    const itemDate = new Date(item.date);
    weekDays.forEach(day => {
      if (itemDate.getDate() === day.date.getDate() && itemDate.getMonth()
        === day.date.getMonth() && itemDate.getFullYear() === day.date.getFullYear()) {
        const workedTime = parseFloat(item.workedTime.replace("h", ""));
        day.hours += workedTime;
      }
    });
  });
};

getWorkedHours();

const getFormattedHours = (hours) => {
  return hours.toFixed(2).replace(".", ",") + " Stunden";
};

</script>

<style scoped>
</style>
