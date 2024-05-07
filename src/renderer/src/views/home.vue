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

        <!-- Zeile 1 -->
        <v-row justify="center">
          <v-col
            cols="12"
            sm="6"
          >
            <!-- Meine Woche -->
            <v-card
              class="ml-5"
              fluid
              border
            >
              <current-week />
            </v-card>
          </v-col>

          <v-col
            cols="12"
            sm="6"
          >
            <!-- Profil -->
            <v-card
              class="mr-5"
              height="78.5%"
              fluid
              border
            >
              <account-overview />
            </v-card>

            <!-- Gleitzeitkonto -->
            <v-card
              class="mr-5 mt-5"
              fluid
              border
            >
              <!--
              <gleitzeit-konto />
              -->
            </v-card>
          </v-col>
        </v-row>

        <!-- Zeile 2 -->
        <v-row justify="center">
          <v-col
            cols="12"
            sm="6"
          >
            <!-- Kreis Woche -->
            <v-card
              class="ml-5"
              fluid
              border
            >
              <time-circle-week />
            </v-card>
          </v-col>

          <v-col
            cols="12"
            sm="6"
          >
            <!-- Kreis Monat -->
            <v-card
              class="mr-5"
              fluid
              border
            >
              <time-circle-month />
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
import TimeCircleMonth from "../components/timeCircleMonth.vue";
import TimeCircleWeek from "../components/timeCircleWeek.vue";
import CurrentWeek from "../components/currentWeek.vue";
import GleitzeitKonto from "../components/gleitzeitKonto.vue";
import AccountOverview from "../components/accountOverview.vue";

</script>
<style scoped>

.border-round {
  border-radius: 10px;
}
</style>
