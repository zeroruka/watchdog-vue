<template>
  <nav class="navbar">
    <router-link class="nav-btn" v-if="Route.name === 'dashboard'" to="/dashboard/account">
      <font-awesome-icon class="icon" icon="fa-solid fa-user" />
      Account
    </router-link>
    <router-link class="nav-btn" v-else to="/dashboard">
      <font-awesome-icon class="icon" icon="fa-solid fa-list" />
      Listings
    </router-link>
    <h1 class="nav-title">Welcome {{ store.username }}!</h1>
    <button class="nav-btn" @click="startScraper">
      <font-awesome-icon v-if="store.scraperRunning" class="icon" icon="fa-solid fa-stop" />
      <font-awesome-icon v-else class="icon" icon="fa-solid fa-play" />
      {{ store.scraperRunning ? "Stop" : "Start" }}
    </button>
  </nav>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { HTTP } from "@/main";
import { useScraperStore } from "@/stores/scraper";
import { useRoute } from "vue-router";

const Route = useRoute();
const store = useScraperStore();

HTTP.get("get-user-profile/")
  .then((response) => {
    store.username = response.data.username;
  })
  .catch((e) => {
    console.log(e);
  });

HTTP.get("control/status/")
  .then((response) => {
    store.scraperRunning = response.data.value;
  })
  .catch((e) => {
    console.log(e);
  });

function startScraper() {
  if (store.scraperRunning) {
    HTTP.post("control/stop/")
      .then((response) => {
        store.scraperRunning = false;
      })
      .catch((e) => {
        console.log(e);
      });
    return;
  }
  HTTP.post("control/start/")
    .then((response) => {
      store.scraperRunning = response.data.message !== "No urls to scrape";
    })
    .catch((e) => {
      console.log(e);
    });
}
</script>

<style scoped>
.nav-title {
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
}

.navbar {
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
}

.nav-btn {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: var(--color-border) solid 1px;
  background-color: var(--color-background);
  color: var(--color-text);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  flex-direction: column;
  transition: all 350ms ease;
}

.nav-btn:hover {
  background-color: var(--color-background-mute);
}

.icon {
  font-size: 1.5rem;
  padding-top: 5px;
  padding-bottom: 8px;
}

@media screen and (max-width: 600px) {
  .nav-title {
    font-size: 1.3rem;
    padding: 0 0.5rem;
  }

  .nav-btn {
    font-size: 0.8rem;
    min-width: 70px;
    padding: 0.2rem 0.5rem;
  }

  .icon {
    font-size: 1rem;
    padding-bottom: 4px;
  }
}
</style>
