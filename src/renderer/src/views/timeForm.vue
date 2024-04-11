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
          label="Pause"
          type="text"
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
let startTime = ref("")
let endTime = ref("")
let date = ref("")

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

  console.log(valid)
  if (valid.valid) {
    const input = {
      date: new Date(date.value).toLocaleString("de-DE", {  weekday: "long" }).substring(0,2) + ". "+ new Date(date.value).toLocaleDateString(),
      startTime: startTime.value,
      endTime: endTime.value
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
