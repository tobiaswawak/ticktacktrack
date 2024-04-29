

<template>
</template>

<style scoped>

</style>

<script setup>
import {computed, ref} from "vue";
const saveTimeStore = useSaveTimeStore();

const months = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember"
];
const selectedMonth = ref(null);
 const filteredItems = computed(() => {
  if (!selectedMonth.value) return saveTimeStore.timestore;

  const selectedMonthIndex = months.findIndex(month => month === selectedMonth.value) + 1;
  return saveTimeStore.timestore.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate.getMonth() + 1 === selectedMonthIndex;
  });
});
</script>
