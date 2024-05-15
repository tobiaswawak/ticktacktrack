<template>
  <v-card>
    <v-card-title class="text-h5 my-2">
      Wochenübersicht
    </v-card-title>
    <v-divider />
    <v-container>
      <v-row v-for="(day, index) in weekDays" :key="index">
        <v-container class="width">
          <p class="font-weight-bold">
            {{ getDayLabelName(day) }}
          </p>
          <p>
            {{ getDayLabel(day) }}
          </p>
        </v-container>

        <v-container class="width vertical-center spacer">
          <p class="font-weight-bold">
          <p>{{ getFormattedHours(day.hours) }}</p>
          </p>
        </v-container>
        <v-divider v-if="!isFriday(day)" class="mx-3" />
      </v-row>
    </v-container>
  </v-card>
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
  { name: "Montag", date: new Date(firstDayOfWeek), hours: 0 },
  { name: "Dienstag", date: new Date(firstDayOfWeek.getTime() + (24 * 60 * 60 * 1000)), hours: 0 },
  { name: "Mittwoch", date: new Date(firstDayOfWeek.getTime() + (2 * 24 * 60 * 60 * 1000)), hours: 0 },
  { name: "Donnerstag", date: new Date(firstDayOfWeek.getTime() + (3 * 24 * 60 * 60 * 1000)), hours: 0 },
  { name: "Freitag", date: new Date(firstDayOfWeek.getTime() + (4 * 24 * 60 * 60 * 1000)), hours: 0 }
];

const getDayLabel = (day) => {
  return day.date.toLocaleDateString("de-DE");
};

const getDayLabelName = (day) => {
  return day.name;
};

const isFriday = (day) => {
  return day.name === "Freitag";
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
.width {
  width: 50%;
}

.vertical-center {
  display: flex;
  flex-direction: column;
  /* Die Elemente vertikal anordnen */
  justify-content: center;
  align-items: flex-end;
  height: 100vh;
}

.spacer {
  height: 80px;
}
</style>