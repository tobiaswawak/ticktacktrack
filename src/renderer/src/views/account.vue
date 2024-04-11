<template>
  <GenralLayout>
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
        <!-- Formular -->
        <v-card
          class="ma-5"
          fluid
          border
        >
          <v-card-text>
            test
          </v-card-text>
        </v-card>
        <v-container />
      </v-card>
    </v-container>
  </GenralLayout>
</template>

<style scoped>

.border-round {
  border-radius: 10px;
}

</style>

<script setup>
import GenralLayout from "../layout/GenralLayout.vue";
</script>
