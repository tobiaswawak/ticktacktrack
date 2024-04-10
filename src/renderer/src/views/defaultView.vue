<template>
  <GenralLayout>
    <v-container
      class="fill-height"
      fluid
    >
      <v-card
        class="justify-center"
        width="100%"
        height="100%"
        fluid
        border
      >
        <template #title>
          Das ist ein Test 
        </template>
      </v-card>
    </v-container>
  </GenralLayout>
</template>


<script setup>
import GenralLayout from "@/layout/GenralLayout.vue";
</script>
