<template>
  <div class="urls-container">
    <div class="header">
      <h2 class="url-header" @click="store.switchView = true">Urls</h2>
      <button
        class="form-input refresh-btn"
        @click="forceRenderer; spin = !spin">
        <font-awesome-icon class="icon" :class="{ spin: spin }" icon="sync" />
      </button>
    </div>
    <div class="urls-area">
      <table class="urls-table" :key="tableKey">
        <thead>
        <tr>
          <th class="table-name">Name</th>
          <th class="table-url">Url</th>
          <th class="table-delete">Delete</th>
        </tr>
        </thead>
        <tbody>
        <TransitionGroup @enter="enterElement" @leave="leaveElement" name="list">
          <tr v-for="row in urls" :key="row.url" :data-index="urlsID++">
            <td class="table-name">{{ row.name }}</td>
            <td class="table-url">
              <a :href="row.url" target="_blank">{{ row.url }}</a>
            </td>
            <td class="delete-header">
              <button class="delete-btn form-input" @click="deleteUrl(row.url)">
                <font-awesome-icon icon="trash" />
              </button>
            </td>
          </tr>
        </TransitionGroup>
        </tbody>
      </table>
    </div>
    <div class="add-url">
      <form class="add-url-form" @submit.prevent="addUrl">
        <input class="form-input name" v-model="urlName" placeholder="Name" type="text" />
        <input class="form-input url" v-model="url" placeholder="Search Text" type="text" />
        <button class="form-input add" type="submit">
          <font-awesome-icon icon="plus" />
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { HTTP } from "@/main.js";
import anime from "animejs";
import { useScraperStore } from "@/stores/scraper";

const urlName = ref("");
const url = ref("");
const tableKey = ref(0);
const spin = ref(false);
const store = useScraperStore();
let urlsID = 0;
let urls = ref([]);

function getUrls() {
  HTTP.get("scraper/")
    .then((response) => {
      urls.value = response.data;
    })
    .catch((e) => {
      console.log(e);
    });
}

async function forceRenderer() {
  urlsID = urlsID - urlsID * 2;
  await getUrls();
  tableKey.value += 1;
}

function enterElement(el, done) {
  anime({
    targets: el,
    opacity: [0, 1],
    translateY: [50, 0],
    duration: 200,
    easing: "easeOutQuad",
    delay: el.dataset.index * 20,
    complete: done
  });
}

function leaveElement(el, done) {
  anime({
    targets: el,
    opacity: [1, 0],
    duration: 200,
    easing: "easeOutQuad",
    complete: done
  });
}

function addUrl() {
  const toTitleCase = (str) =>
    str.replace(/(^\w|\s\w)(\S*)/g, (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase());
  const newUrl = {
    name: toTitleCase(urlName.value),
    url: url.value
  };
  urlName.value = "";
  url.value = "";
  HTTP.put("scraper/", newUrl);
  getUrls();
  getUrls();
  forceRenderer();
}

function deleteUrl(url) {
  HTTP.delete("scraper/", { data: { url: url } });
  getUrls();
  forceRenderer();
}

getUrls();
</script>

<style scoped>
.list-move {
  transition: all 250ms ease;
}

.list-leave-active {
  position: absolute;
}

a {
  color: var(--color-text);
}

.urls-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.1fr 1fr 0.1fr;
  grid-column-gap: 0;
  grid-row-gap: 20px;
  height: 100%;
}

.spin {
  transform: rotate(360deg);
}

.icon {
  transition: all 500ms ease;
}

.header,
.urls-area,
.add-url {
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

.url-header {
  font-weight: 500;
  padding-left: 1rem;
}

.refresh-btn {
  border: var(--color-border) solid 1px !important;
  border-radius: 6px !important;
  padding: 1rem !important;
}

.urls-area {
  overflow-y: auto;
  padding: 0;
  grid-area: 2 / 1 / 3 / 2;
}

.add-url {
  overflow: hidden;
  padding: 0;
  grid-area: 3 / 1 / 4 / 2;
}

.add-url-form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
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

.name,
.url {
  border-right: var(--color-border) solid 1px;
  width: 45%;
}

.add {
  width: 10%;
}

.form-input:hover {
  background-color: var(--color-background-soft);
}

.form-input:focus {
  outline: none;
  background-color: var(--color-background-mute);
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
  background-color: var(--color-background-mute);
  position: sticky;
  top: -0.5px;
  z-index: 1;
}

.delete-header {
  height: 100%;
  text-align: center;
  padding: 0;
}

.delete-btn {
  padding: 1rem;
  border-radius: 5px;
}

.table-url {
  width: 80%;
  word-wrap: anywhere;
}

.table-name {
  max-width: 100px;
}

@media screen and (max-width: 600px) {
  .urls-container {
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

  .url-header {
    font-weight: 500;
    border: var(--color-border) solid 1px;
    border-radius: 6px;
    height: 100%;
    padding: 0.4rem;
  }

  .urls-area {
    overflow-y: auto;
    padding: 0;
  }

  th,
  td {
    padding: 0.4rem;
    font-size: 0.8rem;
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
