<template>
  <v-card>
    <v-card-title class="text-center font-weight-black headline mt-5 text-h5">
      Zeit erfassen
    </v-card-title>
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
            label="Datum"
            type="date"
            :max="maxDate"
            :rules="rules"
            required
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
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="endTime"
            label="Endzeit"
            type="time"
            :rules="rules"
            required
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
          />
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="auto">
          <v-btn
            type="submit"
            color="primary"
          >
            Erfassen
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn
            type="reset"
            color="secondary"
            variant="outlined"
          >
            Zurücksetzen
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useSaveTimeStore } from "../stores/saveTimeStore.js";

const saveTimeStore = useSaveTimeStore();
const form = ref(null);
const maxDate = ref("");
const startTime = ref("15:00");
const endTime = ref("16:00");
const today = new Date().toISOString().split("T")[0];
const date = ref(today);
const pause = ref("15");

onMounted(() => {
  maxDate.value = getMaxDate();
});

const rules = [
  value => {
    if (value) return true;
    return "Bitte eintragen";
  },
];

const saveTime = async () => {
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

    const input = {
      date: date.value,
      startTime: startTime.value,
      endTime: endTime.value,
      pause: pause.value + " min",
      workedTime: totalWorkedTimeHours + "h"
    };
    saveTimeStore.timestore.push(input);
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

.headline {
  letter-spacing: 1px;
}

.v-text-field {
  color: black !important; /* this will override the existing property applied */
}

.v-field {

}

</style>
