import { defineStore } from "pinia";

export const useScraperStore = defineStore("scraperRunning", {
  state: () => ({
    scraperRunning: false,
    username: "",
    switchView: false
  }),
  persist: true
});
