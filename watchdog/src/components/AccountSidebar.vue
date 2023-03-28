<template>
  <div class="sidebar-flex">
    <div class="sidebar-top">
      <router-link
        class="sidebar-items"
        to="/dashboard/account"
        :class="{ 'profile-selected': Router.name === 'profile' }">
        Profile
        <FontAwesomeIcon icon="user" class="icon" />
      </router-link>
      <router-link
        class="sidebar-items"
        to="/dashboard/account/misc"
        :class="{ 'profile-selected': Router.name === 'misc' }">
        Misc
        <FontAwesomeIcon icon="cog" class="icon" />
      </router-link>
    </div>
    <div class="sidebar-bottom">
      <a class="sidebar-items delete-account" @click="deleteAccount">
        Delete Account
        <FontAwesomeIcon icon="trash-alt" class="icon" />
      </a>
      <router-link class="sidebar-items logout" to="/" @click="logout">
        Logout
        <FontAwesomeIcon icon="sign-out-alt" class="icon" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useRoute } from "vue-router";
import { deleteAccount, logout } from "@/common/auth";

const Router = useRoute();
</script>

<style scoped>
.sidebar-top {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.sidebar-flex {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.sidebar-items {
  font-weight: 500;
  font-size: 1.2rem;
  color: var(--color-text);
  margin-bottom: 1rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 8px;
  box-shadow: 0 0 12px 0 var(--color-box-shadow);
  border: var(--color-border) solid 1px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 350ms ease;
  overflow: hidden;
}

.logout, .delete-account {
  margin-bottom: 0;
  margin-top: 1rem;
  background-color: var(--color-warning);
  cursor: pointer;
}

.logout:hover,
.delete-account:hover {
  background-color: var(--color-warning-focus) !important;
}

.sidebar-items:hover {
  background-color: var(--color-background-mute);
}

.profile-selected {
  background-color: hsla(160, 100%, 37%, 0.2) !important;
}

.sidebar-items:before {
  content: '';
  position: absolute;
  left: -20%;
  top: 0;
  width: 0.5rem;
  height: 100%;
  background-color: hsla(160, 100%, 37%, 0.8);
  border-radius: 8px 0 0 8px;
  transition: all 350ms ease;
}

.sidebar-items.profile-selected:before {
  left: 0;
}

@media screen and (max-width: 600px) {
  .sidebar-items {
    font-size: 1rem;
    padding: 0.5rem;
    margin-right: 0.5rem;
    margin-bottom: 0;
    width: 100%;
  }

  .sidebar-flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  .sidebar-top {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-right: 0.5rem;
  }

  .sidebar-bottom {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
  }

  .logout {
    margin-right: 0;
    width: 100%;
  }

  .delete-account {
    margin: 0;
    width: 100%;
  }

  .icon {
    padding-left: 6px;
  }

  .sidebar-items:before {
    width: 0.3rem;
  }
}
</style>
