<template>
  <div class="account-view">
    <h1 class="title">Profile</h1>
    <div class="userinfo">
      <Form class="update-profile-info-form parent" @submit="updateProfileInfo">
        <label for="username" class="grid">Username</label>
        <Field type="text" name="username" class="grid"></Field>

        <label for="old-password" class="grid">Old Password</label>
        <Field type="password" name="oldPassword" class="grid old-password"></Field>

        <label for="password" class="grid">New Password</label>
        <Field
          type="password"
          class="grid new-password"
          name="newPassword"
          :class="{ 'password-no-match': passwordDoesntMatch }"
        ></Field>

        <label for="password2" class="grid">Confirm Password</label>
        <Field
          type="password"
          name="newPassword2"
          rules="required|confirmed:@newPassword"
          :class="{ 'password-no-match': passwordDoesntMatch }"
        ></Field>

        <button type="submit" class="div9 grid">Save</button>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { HTTP } from "@/main";
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import router from "@/router";
import { Form, Field, defineRule } from "vee-validate";
import "animate.css";

const authStore = useAuthStore();
let passwordDoesntMatch = ref(false);

defineRule("confirmed", (value, [target]) => {
  if (value === target) {
    passwordDoesntMatch.value = false;
    return true;
  }
  passwordDoesntMatch.value = true;
  return "Passwords must match";
});

defineRule("required", (value) => {
  if (value) {
    return true;
  }
  return "This field is required";
});

const animateCSS = (element, animation, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });

function updateProfileInfo(values, actions) {
  if (values.newPassword === values.newPassword2) {
    HTTP.post("/change-password/", {
      old_password: values.oldPassword,
      new_password: values.newPassword
    })
      .then(() => {
        authStore.token = null;
        router.push("/");
      })
      .catch((e) => {
        if (e.response.status === 401) {
          animateCSS(".old-password", "shakeX");
          actions.setFieldValue("oldPassword", "");
          alert("Old password is incorrect");
        } else if (e.response.status === 400) {
          animateCSS(".new-password", "shakeX");
          actions.setValues(
            {
              newPassword: "",
              newPassword2: ""
            },
            false
          );
          alert("New password is too similar to old password");
        } else {
          console.log(e);
        }
      });
  } else {
    console.log("Passwords do not match");
  }
}
</script>

<style scoped>
.password-no-match {
  border: 1px solid var(--color-warning-focus) !important;
}

.same-password {
  border: 1px solid var(--color-warning-focus) !important;
}

input,
button {
  background-color: transparent;
  color: var(--color-heading);
  outline: none;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  font-size: 1.5vmin;
  transition: all 350ms ease;
  padding: 1rem;
  box-shadow: var(--color-box-shadow) 0 0 10px 0;
}

input:hover,
button:hover {
  border: 1px solid var(--color-border-hover);
}

input:focus,
button:focus {
  background-color: var(--color-background-soft);
}

label {
  font-size: 1.5vmin;
  font-weight: 500;
  color: var(--color-text);
}

.parent {
  padding-top: 1rem;
  width: 50vmin;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, 1fr);
  align-items: center;
  row-gap: 2vmin;
}

.title {
  font-weight: 700;
  font-size: 2.5rem;
}

.div9 {
  grid-area: 5 / 1 / 6 / 3;
}

@media screen and (max-width: 600px) {
  .parent {
    width: 100%;
    padding: 0.5rem;
  }

  label,
  button,
  input {
    font-size: 3.2vmin;
  }

  .title {
    padding-left: 0.5rem;
  }
}
</style>
