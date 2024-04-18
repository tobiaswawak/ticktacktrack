<template>
  <v-card>
    <v-form
      @submit.prevent
      lazy-validation
      ref="form"
    >
      <v-row no-gutters>
        <v-text-field
          v-model="date"
          label="Datum"
          type="date"
          :max="maxDate"
          :rules="rules"
          required
        />
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="startTime"
          label="Startzeit"
          type="time"
          :rules="rules"
          required
        />

        <v-text-field
          v-model="endTime"
          label="Endzeit"
          type="time"
          :rules="rules"
          required
        />
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="pause"
          label="Pause in min"
          type="number"
          :rules="rules"
          required
        />
      </v-row>

      <v-col>
        <v-btn
          type="submit"
          color="primary"
          class="mr-3 mb-3 ml-2"
          @click="saveTime"
        >
          Erfassen
        </v-btn>

        <v-btn
          color="secondary mr-3 mb-3 ml-2"
          type="reset"
          variant="outlined"
        >
          zurücksetzen
        </v-btn>
      </v-col>
    </v-form>
  </v-card>
</template>

<style scoped></style>

<script setup>
import {onMounted, ref} from "vue";
import {useSaveTimeStore} from "../stores/saveTimeStore.js";

const saveTimeStore = useSaveTimeStore();
const form = ref(null)
let maxDate = ref("")
let startTime = ref("15:00")

let endTime = ref("16:00")

let today = new Date().toISOString().split("T")[0]
let date = ref(today)

let pause = ref("15")

onMounted(() => {
  maxDate.value = getMaxDate()
});

const rules = [
  value => {
    if (value) return true
    return "Bitte eintragen"
  },
]

const saveTime = async () => {

  const valid = await form.value.validate();
  console.log(startTime)
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
      date: new Date(date.value).toLocaleString("de-DE", {  weekday: "long" }).substring(0,2) + ". "+ new Date(date.value).toLocaleDateString(),
      startTime: startTime.value,
      endTime: endTime.value,
      pause: pause.value + " min",
      workedTime: totalWorkedTimeHours + "h"
    }
    saveTimeStore.timestore.push(input);
  }
}

const getMaxDate = () => {
  const currentDate= new Date();
  currentDate.setDate(currentDate.getDate());
  return currentDate.toISOString().split("T")[0];
}

</script>
