<template>
  <div class="account-container">
    <div class="sidebar-container">
      <AccountSidebar />
    </div>
    <div class="account-view-container">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import AccountSidebar from "@/components/AccountSidebar.vue";
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 150ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.account-container {
  display: grid;
  grid-template-columns: 0.25fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  transition: all 350ms ease;
}

.sidebar-container,
.account-view-container {
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 12px 0 var(--color-box-shadow);
  border: var(--color-border) dashed 1px;
}

.sidebar-container {
  grid-area: 1 / 1 / 2 / 2;
}

.account-view-container {
  grid-area: 1 / 2 / 2 / 3;
}

@media screen and (max-width: 600px) {
  .account-container {
    grid-template-columns: 0.25fr 1fr;
    grid-template-rows: 0.05fr 1fr;
    grid-column-gap: 15px;
    grid-row-gap: 15px;
  }

  .sidebar-container,
  .account-view-container {
    padding: 0.5rem;
  }

  .sidebar-container {
    grid-area: 1 / 1 / 2 / 3;
  }

  .account-view-container {
    grid-area: 2 / 1 / 3 / 3;
  }
}
</style>
