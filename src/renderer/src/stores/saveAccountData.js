import { defineStore } from "pinia";

export const useSaveAccountData = defineStore("accountData", {
  state: () => {
    return {
      accountData: {firstName: null, lastName:null, jobTitle:null, workingHours:null, image:null},
    };
  },
  persist:false
});
