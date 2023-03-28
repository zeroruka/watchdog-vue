<template>
  <div class="dashboard-container" :class="{ 'scraper-active': store.scraperRunning }">
    <div class="header">
      <Dashbar />
    </div>
    <router-view v-slot="{ Component }" class="router">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <Transition name="fade" mode="out-in">
      <div
        class="urls"
        :class="{ 'scraper-running': store.scraperRunning, 'hidden': store.switchView, 'grid-area': !store.switchView}"
        v-if="Route.name === 'dashboard'">
        <Transition name="fade" mode="out-in">
          <Urls class="urls-container" v-if="!store.scraperRunning" />
          <div v-else class="scraper-running">
            <h1 class="scraper-running font">Scraper is running</h1>
            <h3 class="inner font">Stop scraper to edit URLs</h3>
          </div>
        </Transition>
      </div>
    </Transition>
    <Transition name="fade" mode="out-in">
      <div class="listings" v-if="Route.name === 'dashboard'"
           :class="{'hidden': !store.switchView, 'grid-area': store.switchView}">
        <Listings />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import Dashbar from "@/components/Dashbar.vue";
import Urls from "@/components/Urls.vue";
import Listings from "@/components/Listings.vue";
import { useScraperStore } from "@/stores/scraper";
import { useRoute } from "vue-router";

const Route = useRoute();
const store = useScraperStore();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active .inner,
.fade-leave-active .inner {
  transition: all 0.2s ease;
}

.fade-enter-from .inner,
.fade-leave-to .inner {
  opacity: 0;
  transform: translateY(50px);
}

.urls-container {
  width: 100%;
}

.scraper-running {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.scraper-running .font {
  font-size: 1.4vw;
  font-weight: 600;
}

.inner {
  font-size: 0.9vw !important;
  font-weight: 400 !important;
}

.scraper-active {
  grid-template-columns: 0.2fr 1fr !important;
}

.dashboard-container {
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 0.12fr 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  width: 100vw;
  transition: all 350ms ease;
}

.header,
.urls,
.listings {
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 12px 0 var(--color-box-shadow);
  border: var(--color-border) dashed 1px;
}

.header {
  grid-area: 1 / 1 / 2 / 3;
  display: flex;
}

.urls {
  grid-area: 2 / 1 / 3 / 2;
  height: calc(100dvh - 100dvh * 0.12 - 40px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.listings {
  grid-area: 2 / 2 / 3 / 3;
  height: calc(100dvh - 100dvh * 0.12 - 40px);
}

.router {
  grid-area: 2 / 1 / 3 / 3;
  height: calc(100dvh - 100dvh * 0.12 - 40px);
}

@media screen and (max-width: 600px) {
  .dashboard-container {
    grid-template-columns: 1fr;
    grid-template-rows: 0.05fr 1fr;
    grid-column-gap: 15px;
    grid-row-gap: 15px;
  }

  .header,
  .urls,
  .listings {
    padding: 0.5rem;
  }

  .hidden {
    display: none;
  }

  .grid-area {
    grid-area: 2 / 1 / 3 / 3;
  }


  .scraper-running .font {
    font-size: 2rem;
    font-weight: 700;
  }

  .inner {
    font-size: 1.2rem !important;
    font-weight: 400 !important;
  }


}
</style>
