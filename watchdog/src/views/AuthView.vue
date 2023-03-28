<template>
  <div class="auth-container">
    <div id="blob"></div>
    <div id="blur"></div>
    <div class="login-card" :class="{ persist: loginActive || registerActive }">
      <div class="login-card-content" :class="{ persist: loginActive || registerActive }">
        <div class="login-register-selection-container">
          <h1
            class="login-card-title left"
            :class="{ 'small-title': loginActive, hidden: registerActive }"
            @click="loginActive = !loginActive"
          >
            Login
          </h1>
          <h1 class="seperator" :class="{ hidden: loginActive || registerActive }">|</h1>
          <h1
            class="login-card-title right"
            :class="{ 'small-title': registerActive, hidden: loginActive }"
            @click="registerActive = !registerActive"
          >
            Register
          </h1>
        </div>
        <Transition name="slide-in-left">
          <Login v-if="loginActive && !registerActive" class="auth-form" />
        </Transition>
        <Transition name="slide-in-right">
          <Register v-if="registerActive && !loginActive" class="auth-form register" />
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";

const loginActive = ref(false);
const registerActive = ref(false);

onMounted(() => {
  const blob = document.getElementById("blob");
  // wait for the blob to be rendered
  setTimeout(() => {
    blob.animate(
      [
        {
          transform: "scale(0)",
          opacity: 0
        },
        {
          transform: "scale(1)",
          opacity: 0.8
        }
      ],
      {
        duration: 1000,
        easing: "ease-in-out"
      }
    );
  }, 100);
  // after the blob is rendered, add the style opacity: 0.8
  setTimeout(() => {
    blob.classList.add("animation-done");
  }, 1100);

  window.onpointermove = event => {
    const { clientX, clientY } = event;

    blob.animate({
      left: `${clientX}px`,
      top: `${clientY}px`
    }, { duration: 5000, fill: "forwards", easing: "ease" });
  };
});

</script>


<style scoped>

@keyframes rotate {
  from {
    rotate: 0deg;
  }

  50% {
    scale: 1 1.5;
  }

  to {
    rotate: 360deg;
  }
}

#blob {
  height: 34vmax;
  aspect-ratio: 1;
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  border-radius: 50%;
  background: black linear-gradient(to right, aquamarine, mediumpurple);
  animation: rotate 20s infinite;
  opacity: 0;
  transition: all 0.2s ease;
}

.animation-done {
  opacity: 0.8 !important;
}

#blur {
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 2;
  backdrop-filter: blur(12vmax);
  -webkit-backdrop-filter: blur(12vmax);
}

.slide-in-left-enter-active,
.slide-in-left-leave-active {
  transition: all 0.2s ease;
}

.slide-in-left-enter-from,
.slide-in-left-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

.slide-in-right-enter-active,
.slide-in-right-leave-active {
  transition: all 0.2s ease;
}

.slide-in-right-enter-from,
.slide-in-right-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

.auth-form {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 2;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.auth-form.register {
  align-items: flex-end;
  width: 100%;
}

.hidden {
  opacity: 0;
}

.small-title {
  color: var(--color-heading);
  font-size: 5vmin !important;
  margin: 3vmin;
  transform: translateX(-100%);
}

.small-title.left {
  transform: translateX(100%) !important;
  z-index: 3;
}

.small-title.right {
  z-index: 3;
}

.login-register-selection-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.login-card-title {
  font-size: 4vmin;
  width: 100%;
  transition: all 350ms ease;
}

.login-card-title:hover {
  color: var(--color-heading);
  font-size: 4.5vmin;
}

.seperator {
  font-size: 4vmin;
}

.left {
  text-align: right;
  padding-right: 1vmin;
}

.right {
  text-align: left;
  padding-left: 1vmin;
}

.login-card {
  aspect-ratio: 2 / 1;
  border: 0.4vmin solid var(--color-border);
  cursor: pointer;
  position: relative;
  width: 56vmin;
  display: flex;
  user-select: none;

}

.login-card:before {
  background-image: linear-gradient(
    135deg,
    transparent 0% 33%,
    rgb(98, 0, 234) 66%,
    rgb(236, 64, 122) 83.5%,
    rgb(253, 216, 53) 100%
  );
  background-position: 0 0;
  background-size: 300% 300%;
  opacity: 0;
  content: '';
  height: 100%;
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  transition: all 450ms ease;
  width: 100%;
  z-index: 1;
}

.login-card:hover:before,
.persist:before {
  background-position: 100% 100%;
  transform: scale(1.05, 1.1);
  opacity: 1;
}

.login-card-content {
  background: radial-gradient(rgba(255, 255, 255, 0.2) 8%, transparent 8%) 0 0;
  background-size: 4vmin 4vmin;
  height: 100%;
  transition: background-position 350ms ease;
  width: 100%;
  z-index: 2;
}

.login-card:hover > .login-card-content,
.active-card > .login-card-content,
.persist > .login-card-content {
  background-position: -10% 0;
}

.auth-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 600px) {
  .login-card {
    width: 90vmin;
    aspect-ratio: 1.6 / 1;
  }

  .login-card-title,
  .seperator {
    font-size: 6vmin;
  }

  .small-title {
    font-size: 8vmin !important;
  }

  .login-card-title:hover {
    font-size: 7vmin;
  }

  .login-card-content {
    background-size: 6vmin 6vmin;
  }

  .login-card:hover > .login-card-content,
  .active-card > .login-card-content,
  .persist > .login-card-content {
    background-position: -10% 0;
  }

  .small-title.left {
    transform: translateX(80%) !important;
    z-index: 3;
  }

  .small-title.right {
    transform: translateX(-90%) !important;
    z-index: 3;
  }

}

</style>
