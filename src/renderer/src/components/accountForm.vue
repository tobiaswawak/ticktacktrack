<template>
  <v-card
    class="ma-5 pa-3"
    border
    color="primary"
    v-if="checkInfo(userdata)"
  >
    <v-row class="info">
      <v-icon class="ma-5">
        mdi-information-outline
      </v-icon>
      <v-card-text>
        Um die Anwendung nutzen zu können, tragen Sie bitte ihre Daten ein
      </v-card-text>
    </v-row>
  </v-card>
  <div class="ma-5 ml-8 mr-8 mt-10">
    <v-row
      v-if="userdata.image"
    >
      <v-avatar
        size="80"
        class="ml-2 mb-3"
      >
        <v-img :src="convertIMG(userdata.image)" />
      </v-avatar>
      <v-btn
        v-if="userdata.image !== null"

        @click="deleteProfileImg()"
        class="ml-6 mt-5"
        variant="outlined"
        color="red"
      >
        Reset
      </v-btn>
    </v-row>
    <v-file-input
      v-else
      prepend-icon="mdi-image-edit"
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
          color="primary"
          prepend-icon="mdi-content-save"
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
  // console.log(saveAccountData.accountData)
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

    // Größe prüfen
    const maxSizeInBytes = 320 * 1024; // 500 KB

    if (image.value.size > maxSizeInBytes) {
      window.alert("Die Dateigröße darf maximal 320 KB betragen.");
      console.error("File size too large" + image.value.size)
      loadingPic.value=false
      return;
    }

    if (image.value !== saveAccountData.accountData.image){
    let img = []
    await fileToByteArray(image.value)
      .then(byteArray => {
        img = byteArray

      })
      .catch(error => {
        console.error("Fehler:", error);
      });
    saveAccountData.accountData.image = img
    }
  }
    loadingPic.value=false
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

const checkInfo = (data) => {
  return data.firstName === null || data.lastName === null || data.jobTitle === null || data.workingHours === null;
}

</script>

<style scoped>
v-form {
  transition: all 0.3s ease;
}

.info {
  display: flex;
  align-items: center;
}
</style>
