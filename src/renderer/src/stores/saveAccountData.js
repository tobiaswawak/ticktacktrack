import { defineStore } from "pinia";

export const useSaveAccountData = defineStore("accountData", {
  state: () => {
    return {
      accountData: JSON.parse(localStorage.getItem("accountData")) || {firstName: null, lastName:null, jobTitle:null, workingHours:null, image:null},
    };
  },
  actions: {
    saveData() {
      localStorage.setItem("accountData", JSON.stringify(this.accountData));
    },
  },
  persist: true,
});
