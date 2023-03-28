import { createApp } from "vue";
import { createPinia } from "pinia";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

library.add(fas);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

app.use(pinia);
app.use(router);

const store = useAuthStore();

export const HTTP = axios.create({
  baseURL: `https://watchdog.zeroruka.moe/api/`
});

HTTP.interceptors.request.use(
  (config) => {
    const token = store.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

app.mount("#app");
