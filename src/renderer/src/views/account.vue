<template>
  <GeneralLayout>
    <v-container class="fill-height" fluid>
      <v-card class="justify-center border-round" width="100%" height="100%" fluid border color="#f5f8fd">
        <v-card class="ma-5" fluid border>
          <v-card-title class="text-h5 my-2">
            <span class="mdi mdi-account"></span> Mein Account
          </v-card-title>
        </v-card>
        <!-- Formular -->
        <v-card class="ma-5" fluid border>
          <account-form />
        </v-card>
      </v-card>
    </v-container>
  </GeneralLayout>
</template>


<script setup>

import GeneralLayout from "../layout/GeneralLayout.vue";
import AccountForm from "../components/accountForm.vue";

</script>
<style scoped>
.border-round {
  border-radius: 10px;
}
</style>
