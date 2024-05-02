<template>
  <v-card>
    <v-form
      @submit.prevent="saveTime"
      lazy-validation
      ref="form"
      class="pa-5"
    >
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="date"
            :max="maxDate"
            :rules="[...rules, checkDuplicateEntry]"
            color="primary"
            label="Datum"
            required
            type="date"
            variant="outlined"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="startTime"
            label="Startzeit"
            type="time"
            :rules="rules"
            required
            variant="outlined"
            color="primary"
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="endTime"
            label="Endzeit"
            type="time"
            :rules="rules"
            required
            variant="outlined"
            color="primary"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="pause"
            label="Pause in min"
            type="number"
            :rules="rules"
            required
            variant="outlined"
            color="primary"
          />
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="auto">
          <v-btn
            type="submit"
            color="primary"
            prepend-icon="mdi-check"
          >
            Erfassen
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

<script setup>
import {onMounted, ref} from "vue";
import {useSaveTimeStore} from "../stores/saveTimeStore.js";
import {useSaveAccountData} from "../stores/saveAccountData.js";

const saveTimeStore = useSaveTimeStore();
const useAccountData = useSaveAccountData();

const form = ref(null);
const maxDate = ref("");
const startTime = ref("");

const d = new Date();
const n = d.getHours() + ":" + d.getMinutes();

const endTime = ref(n);
const today = new Date().toISOString().split("T")[0];
const date = ref(today);
const pause = ref("");

onMounted(() => {
  maxDate.value = getMaxDate();
});

const rules = [
  value => {
    if (value) return true;
    return "Bitte eintragen";
  },
  value => {
    if (!startTime.value || !endTime.value) return true; // Skip validation if fields are empty
    const start = new Date("2000-01-01T" + startTime.value + ":00");
    const end = new Date("2000-01-01T" + endTime.value + ":00");
    if (start >= end) {
      return "Die Startzeit muss vor der Endzeit liegen";
    }
    return true;
  },
  value => {
    const start = new Date("2000-01-01T" + startTime.value + ":00");
    const end = new Date("2000-01-01T" + endTime.value + ":00");
    const pauseMinutes = parseInt(pause.value);
    const totalWorkedTimeMinutes = (end - start) / (1000 * 60) - pauseMinutes;
    if (totalWorkedTimeMinutes <= 0) return "Die Arbeitszeit beträgt weniger als 0 min";
    return true;
  }
];

const saveTime = async () => {
  try {
  const valid = await form.value.validate();
  if (valid.valid) {
    const start = new Date("2000-01-01T" + startTime.value + ":00");
    const end = new Date("2000-01-01T" + endTime.value + ":00");
    const workedTimeMinutes = (end - start) / (1000 * 60);

    // Ziehe die Pausenzeit ab
    const pauseMinutes = parseInt(pause.value);
    const totalWorkedTimeMinutes = workedTimeMinutes - pauseMinutes;

    // Arbeitszeit in Stunden umrechnen
    const totalWorkedTimeHours = totalWorkedTimeMinutes / 60;

    // Gleitzeit / Überstunden

    const standardWorkHoursPerDay = useAccountData.accountData[0].workingHours / 5; //
    let overtime = totalWorkedTimeHours - standardWorkHoursPerDay;
    overtime = overtime.toFixed(2) + " h"


    const input = {
      date: date.value,
      startTime: startTime.value,
      endTime: endTime.value,
      pause: pause.value + " min",
      workedTime: totalWorkedTimeHours.toFixed(2) + "h", // Dauer auf zwei Nachkommastellen begrenzen
      overtime: overtime
    };

    const existingEntry = saveTimeStore.timestore.find(item => item.date === input.date);
    if (existingEntry) {
      form.value.setErrors({date: "Für dieses Datum wurde bereits ein Eintrag gemacht"});
    } else {
      saveTimeStore.timestore.push(input);
    }
  }
} catch (error) {
    window.alert("Für diesen Tag wurde bereits eine Zeit erfasst");
  }
};

const getMaxDate = () => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate());
  return currentDate.toISOString().split("T")[0];
};
</script>

<style scoped>
v-form {
  transition: all 0.3s ease;
}
</style>
