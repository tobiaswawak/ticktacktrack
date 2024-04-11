import { defineStore } from "pinia";

export const useSaveTimeStore = defineStore("timestore", {
  state: () => {
    return {
      timestore: [],
    };
  },
  persist:true
});
