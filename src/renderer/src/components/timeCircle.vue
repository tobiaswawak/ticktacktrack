<script setup>

</script>

<template>
  <div class="text-center">
    <v-progress-circular
      :model-value="value"
      :rotate="360"
      :size="100"
      :width="15"
      color="teal"
    >
      <template #default>
        {{ value }} %
      </template>
    </v-progress-circular>
  </div>
</template>

<style scoped>

</style>
