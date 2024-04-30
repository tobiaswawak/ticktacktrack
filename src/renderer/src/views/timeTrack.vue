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
            ⏰ Zeit erfassen
          </v-card-title>
        </v-card>

        <!-- Formular -->
        <v-card
          class="ma-5"
          fluid
          border
        >
          <time-form />
        </v-card>


        <!-- Tabelle -->
        <v-card
          class="ma-5"
          fluid
          border
        >
          <saved-time-table />
        </v-card>
        <v-container />
      </v-card>
    </v-container>
  </GeneralLayout>
</template>

<style scoped>

.border-round {
  border-radius: 10px;
}

</style>

<script setup>
import GeneralLayout from "@/layout/GeneralLayout.vue";
import SavedTimeTable from "../components/savedTimeTable.vue";
import TimeForm from "../components/timeForm.vue";
import FilterTable from "../components/filterTable.vue";
</script>
