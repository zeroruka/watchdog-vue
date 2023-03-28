import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: null,
    token: null,
    registering: false
  }),
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    }
  },
  persist: true
});
