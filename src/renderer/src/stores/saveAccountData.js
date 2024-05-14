// In deinem Pinia Store

import { defineStore } from "pinia";

export const useSaveAccountData = defineStore("accountData", {
  state: () => {
    return {
      accountData: JSON.parse(localStorage.getItem("accountData")) || {firstName: null, lastName:null, jobTitle:null, workingHours:null, image:null},
    };
  },
  persist: false,
});
