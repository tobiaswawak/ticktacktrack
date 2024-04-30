<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-select
          v-model="selectedMonth"
          :items="months"
          label="Monat auswählen"
          variant="outlined"
          color="primary"
        />
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="selectedYear"
          :items="years"
          label="Jahr auswählen"
          variant="outlined"
          color="primary"
          no-data-text="Es wurden noch keine Zeiten erfasst"
        />
      </v-col>
    </v-row>
  </v-container>

  <v-data-table-virtual
    :headers="headerVariables"
    :items="filteredItems"
    dense
    fixed-header
    no-data-text="Es wurden noch keine Zeiten erfasst"
  >
    <template #item.action="{index}">
      <v-btn
        border
        @click="deleteItem(index)"
      >
        <v-icon
          color="red"
        >
          mdi-trash-can
        </v-icon>
      </v-btn>
    </template>
    <template #item.date="{item}">
      <p>
        {{ transformDate(item.date) }}
      </p>
    </template>
  </v-data-table-virtual>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useSaveTimeStore } from "../stores/saveTimeStore.js";
import {useSaveAccountData} from "../stores/saveAccountData.js";

const saveTimeStore = useSaveTimeStore();
const useAccountData = useSaveAccountData();

let headerVariables = ref([
  {
    align: "begin",
    key: "date",
    sortable: true,
    title: "Datum"
  },
  {
    align: "begin",
    key: "startTime",
    sortable: false,
    title: "Startzeit"
  },
  {
    align: "begin",
    key: "endTime",
    sortable: false,
    title: "Endzeit"
  },
  {
    align: "begin",
    key: "pause",
    sortable: false,
    title: "Pause"
  },
  {
    align: "begin",
    key: "workedTime",
    sortable: false,
    title: "Dauer"
  },
  {
    align: "begin",
    key: "overtime",
    sortable: false,
    title: "Gleitzeit"
  },
  {
    align: "end",
    key: "action",
    sortable: false,
    title: ""
  }
]);

const deleteItem = (index) => {
  saveTimeStore.timestore.splice(index, 1);
};

const transformDate = (date) => {
  return new Date(date).toLocaleString("de-DE", { weekday: "long" }).substring(0, 2) + ". " + new Date(date).toLocaleDateString()
};

// Gleitzeit / Überstunden
const calculateOvertime = (workedTime) => {
  const standardWorkHoursPerDay = useAccountData.accountData[0].workingHours / 5; // TODO hier muss die Standard-Arbeitsstunden pro Tag hin
  const overtime = workedTime - standardWorkHoursPerDay; // Berechnung der Überstunden
  return overtime.toFixed(2) + " h"// Rückgabe der Überstunden oder "0 h" falls keine Überstunden
};

const years = computed(() => {
  const uniqueYears = Array.from(new Set(saveTimeStore.timestore.map(item => new Date(item.date).getFullYear())));
  return uniqueYears.sort((a, b) => b - a);
});
const selectedYear = ref(null);


// Filter
const months = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember"
];
const selectedMonth = ref(null);

const filteredItems = computed(() => {
  let filtered = saveTimeStore.timestore;
  if (selectedYear.value !== null) {
    filtered = filtered.filter(item => new Date(item.date).getFullYear() === selectedYear.value);
  }
  if (selectedMonth.value !== null) {
    const selectedMonthIndex = months.findIndex(month => month === selectedMonth.value) + 1;
    filtered = filtered.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate.getMonth() + 1 === selectedMonthIndex;
    });
  }
  return filtered.map(item => ({
    ...item,
    workedTime: parseFloat(item.workedTime).toFixed(2) + " h", // Begrenzung auf 2 Nachkommastellen
    overtime: calculateOvertime(parseFloat(item.workedTime))
  }));
});

// Watcher hinzufügen, um die Filter zu aktualisieren
watch(() => saveTimeStore.timestore, () => {
  updateFilters();
});

function updateFilters() {
  if (selectedYear.value !== null && !years.value.includes(selectedYear.value)) {
    selectedYear.value = null;
  }
  if (selectedMonth.value !== null && !months.includes(selectedMonth.value)) {
    selectedMonth.value = null;
  }
}
</script>


<style scoped>

</style>
