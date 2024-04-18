

<template>
  <GeneralLayout>
    <v-container
      class="fill-height"
      fluid
    >
      <v-card
        class="justify-center border-round"
        width="100%"
        height="100%"
        fluid
        border
      >
        Hallo
      </v-card>
    </v-container>
  </GeneralLayout>
</template>


<script setup>

import GeneralLayout from "../layout/GeneralLayout.vue";
</script>
<style scoped>

.border-round {
  border-radius: 10px;
}
</style>
