import { defineStore } from "pinia";

export const useSaveAccountData = defineStore("accountData", {
  state: () => {
    return {
      accountData: [],
    };
  },
  persist:true
});
