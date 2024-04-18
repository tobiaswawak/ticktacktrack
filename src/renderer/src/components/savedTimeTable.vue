<template>
  <v-data-table-virtual
    :headers="headerVariables"
    :items="saveTimeStore.timestore"
    dense
    fixed-header
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

<style scoped>

</style>

<script setup>
import {ref} from "vue";
import {useSaveTimeStore} from "../stores/saveTimeStore.js";

const saveTimeStore = useSaveTimeStore();

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

  return new Date(date).toLocaleString("de-DE", {weekday: "long"})
    .substring(0, 2) + ". " + new Date(date).toLocaleDateString()

}

</script>
