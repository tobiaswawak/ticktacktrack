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
        <v-card
          class="ma-5"
          fluid
          border
        >
          <v-card-title class="text-h5 my-2">
            🏠 Home
          </v-card-title>
        </v-card>
        <v-card
          class="ma-5"
          fluid
          border
        >
          <v-card-title>Hallo</v-card-title>
        </v-card>
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
