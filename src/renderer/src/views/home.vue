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

        <v-row justify="center">
          <v-col
            cols="12"
            sm="6"
          >
            <v-card
              class="ml-5 mt-5"
              fluid
              border
            >
              <time-circle />
            </v-card>
          </v-col>

          <v-col
            cols="12"
            sm="6"
          >
            <!-- Tabelle -->
            <v-card
              class="mr-5 mt-5"
              fluid
              border
            >
              <v-card-title>test2</v-card-title>
            </v-card>
          </v-col>
        </v-row>
        <v-container />
      </v-card>
    </v-container>
  </GeneralLayout>
</template>

<script setup>

import GeneralLayout from "../layout/GeneralLayout.vue";
import TimeCircle from "../components/timeCircle.vue";

</script>
<style scoped>

.border-round {
  border-radius: 10px;
}
</style>
