

<template>
  <v-data-table
    :headers="headerVariables"

    :items="saveTimeStore.timestore"
    dense
    fixed-header
  >
    <template #bottom />
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
  </v-data-table>
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
    sortable: false,
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
    align: "end",
    key: "action",
    sortable: false,
    title: ""
  }
]);

const deleteItem = (index) => {
  saveTimeStore.timestore.splice(index,1);
};

</script>
