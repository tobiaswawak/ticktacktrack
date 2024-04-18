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
      />
    </v-container>
  </GeneralLayout>
</template>


<script setup>

import GeneralLayout from "../layout/GeneralLayout.vue";

</script>
<style scoped>
.vc-container .vc-weekday-1, .vc-container .vc-weekday-7 {
  color: #6366f1;
}
.border-round {
  border-radius: 10px;
}
</style>
