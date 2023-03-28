<template>
  <div class="listings-container">
    <div class="header">
      <h2 class="listings-header" @click="store.switchView = false">Listings</h2>
      <button
        class="form-input refresh-btn"
        @click="forceRenderer(); spin = !spin">
        <font-awesome-icon class="icon" :class="{ spin: spin }" icon="sync" />
      </button>
    </div>
    <div class="listings-area">
      <table class="listings-table" :key="listingsKey">
        <thead>
        <tr>
          <th class="table-date">Date</th>
          <th class="table-price">Price</th>
          <th class="table-name">Name</th>
        </tr>
        </thead>
        <tbody>
        <TransitionGroup @enter="enterElement" @leave="leaveElement" :css="false">
          <tr v-for="listing in listings" :key="listing">
            <td class="table-date animate">{{ listing.listing.date_added }}</td>
            <td class="table-price animate">{{ listing.listing.price }}</td>
            <td class="table-name animate">
              <a :href="listing.listing.url" target="_blank">{{ listing.listing.title }}</a>
            </td>
          </tr>
        </TransitionGroup>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { HTTP } from "@/main.js";
import anime from "animejs";
import { useScraperStore } from "@/stores/scraper";

const spin = ref(false);
const listings = ref();
const listingsKey = ref(0);
const store = useScraperStore();

async function forceRenderer() {
  await getListings();
  listingsKey.value += 1;
}

function enterElement() {
  anime({
    targets: ".animate",
    opacity: [0, 1],
    translateY: [50, 0],
    duration: 250,
    easing: "easeOutQuad",
    delay: anime.stagger(10, { start: 100 })
  });
}

function leaveElement() {
  anime({
    targets: ".animate",
    opacity: [1, 0],
    duration: 200,
    easing: "easeOutQuad"
  });
}

function getListings() {
  HTTP.get("listings/")
    .then((response) => {
      listings.value = response.data;
    })
    .catch((e) => {
      console.log(e);
    });
}

getListings();
</script>

<style scoped>
a {
  color: var(--color-text);
}

.refresh-btn {
  border: var(--color-border) solid 1px !important;
  border-radius: 6px !important;
  padding: 1rem !important;
}

.spin {
  transform: rotate(360deg);
}

.icon {
  transition: all 500ms ease;
}

.listings-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.1fr 1fr 0.1fr;
  grid-column-gap: 0;
  grid-row-gap: 20px;
  height: 100%;
}

.form-input {
  border-radius: 0;
  border: none;
  height: 100%;
  background: none;
  color: var(--color-text);
  font-size: 1rem;
  padding: 1rem;
  transition: all 350ms ease;
}

.form-input:hover {
  background-color: var(--color-background-soft);
}

.form-input:focus {
  outline: none;
  background-color: var(--color-background-mute);
}

.header,
.listings-area {
  padding: 0.5rem;
  border-radius: 8px;
  box-shadow: 0 0 12px 0 var(--color-box-shadow);
  border: var(--color-border) solid 1px;
}

.header {
  grid-area: 1 / 1 / 2 / 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.listings-header {
  font-weight: 500;
  padding-left: 1rem;
}

.listings-area {
  overflow-y: auto;
  padding: 0;
  grid-area: 2 / 1 / 4 / 2;
}

table {
  width: 100%;
  border-collapse: collapse;
  vertical-align: middle;
}

th,
td {
  border: var(--color-border) solid 1px;
  padding: 0.5rem;
  word-wrap: break-word;
}

thead th {
  background: var(--color-background-mute);
  position: sticky;
  top: -0.5px;
  z-index: 1;
}

.table-name {
  width: 75%;
}

@media screen and (max-width: 600px) {
  .listings-container {
    grid-template-columns: 1fr;
    grid-template-rows: 0.1fr 1fr 0.1fr;
    grid-column-gap: 0;
    grid-row-gap: 10px;
    height: 100%;
  }

  .header {
    font-size: 0.8rem;
    padding: 0.4rem;
  }

  .refresh-btn {
    padding: 0.5rem !important;
    margin: 0;
  }

  .form-input {
    padding: 0.5rem;
  }

  .icon {
    font-size: 0.9rem;
  }

  .listings-header {
    font-weight: 500;
    border: var(--color-border) solid 1px;
    border-radius: 6px;
    height: 100%;
    padding: 0.4rem;
  }

  .listings-area {
    overflow-y: auto;
    padding: 0;
    grid-area: 2 / 1 / 4 / 2;
  }

  th,
  td {
    padding: 0.4rem;
    font-size: 0.8rem;
  }

  .table-name {
    width: 75%;
  }
}


::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}

::-webkit-scrollbar-button {
  width: 0px;
  height: 0px;
}

::-webkit-scrollbar-thumb {
  background: #e1e1e1;
  border: 0px none #ffffff;
  border-radius: 50px;
}

::-webkit-scrollbar-thumb:hover {
  background: #ffffff;
}

::-webkit-scrollbar-thumb:active {
  background: #000000;
}

::-webkit-scrollbar-track {
  background: #666666;
  border: 0px none #ffffff;
  border-radius: 50px;
}

::-webkit-scrollbar-track:hover {
  background: #666666;
}

::-webkit-scrollbar-track:active {
  background: #333333;
}

::-webkit-scrollbar-corner {
  background: transparent;
}
</style>
