<template>
  <div class="ma-5 ml-8 mr-8 mt-10">
    <v-row
      v-if="userdata.image"
    >
      <v-avatar size="80">
        <v-img :src="convertIMG(userdata.image)" />
      </v-avatar>
      <v-btn
        v-if="userdata.image !== null"
        icon="mdi-trash-can"
        border
        @click="deleteProfileImg()"
        class="ml-6 mt-3"
      />
    </v-row>
    <v-file-input
      v-else
      prepend-icon="mdi-image-edit-outline"
      v-model="image"
      accept="image/*"
      color="primary"
      variant="outlined"
    />
  </div>

  <v-form
    lazy-validation
    ref="form"
    class="mt-5"
  >
    <v-row class="mx-5">
      <v-col cols="6">
        <v-text-field
          v-model="userdata.firstName"
          label="Vorname"
          type="text"
          :rules="rules"
          required
          variant="outlined"
          color="primary"
          prepend-icon="mdi-account-edit-outline"
        />
      </v-col>

      <v-col cols="6">
        <v-text-field
          v-model="userdata.lastName"
          label="Nachname"
          type="input"
          :rules="rules"
          required
          variant="outlined"
          color="primary"
        />
      </v-col>
    </v-row>

    <v-row class="mx-5">
      <v-col cols="6">
        <v-text-field
          v-model="userdata.jobTitle"
          label="Jobtitel"
          type="text"
          :rules="rules"
          required
          variant="outlined"
          color="primary"
          prepend-icon="mdi-account-tie-outline"
        />
      </v-col>

      <v-col cols="6">
        <v-text-field
          v-model="userdata.workingHours"
          label="Arbeitsstunden pro Woche"
          type="number"
          :rules="rules"
          required
          variant="outlined"
          color="primary"
          prepend-icon="mdi-clock-outline"
        />
      </v-col>
    </v-row>

    <v-row
      justify="center"
      class="mb-5"
    >
      <v-col cols="auto">
        <v-btn
          border
          @click="saveUserData"
          :loading="loadingPic"
        >
          Speichern
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>


<script setup>
import {onMounted, ref} from "vue";
import {useSaveAccountData} from "../stores/saveAccountData.js";

const saveAccountData = useSaveAccountData();
const form = ref(null);
let userdata = ref({})
let image = ref(null)
let loadingPic = ref(false)

const rules = [
  value => {
    if (value) return true;
    return "Bitte eintragen";
  },
];

onMounted(() => {
  console.log(saveAccountData.accountData)
  if (!userdata.value) {
    userdata.value = {firstName: null, lastName: null, jobTitle: null, workingHours: null, image: []}
  } else {
    userdata.value = saveAccountData.accountData;
  }
});

const deleteProfileImg = () => {
  saveAccountData.accountData.image = null
}

const saveUserData = () => {
  saveAccountData.accountData = userdata.value
  saveImg()
}

const saveImg = async () => {
  loadingPic.value=true
  if (image.value!==null) {
  let img = []
  await fileToByteArray(image.value)
    .then(byteArray => {
      img = byteArray
      console.log("Byte-Array:", byteArray);
    })
    .catch(error => {
      console.error("Fehler:", error);
    });
  saveAccountData.accountData.image = img
  loadingPic.value=false
  }
}

const fileToByteArray = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const arrayBuffer = reader.result;
      const byteArray = new Uint8Array(arrayBuffer);
      resolve(byteArray);
    };

    reader.onerror = () => {
      reject(new Error("Fehler beim Lesen der Datei"));
    };

    reader.readAsArrayBuffer(file);
  });
}

const convertIMG = (byteArray) => {
  const uint8Array = new Uint8Array(Object.values(byteArray));
  const blob = new Blob([uint8Array]);
  return URL.createObjectURL(blob);
}


</script>

<style scoped>
v-form {
  transition: all 0.3s ease;
}
</style>
