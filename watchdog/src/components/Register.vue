<template>
  <Form class="register-form" @submit="registerUser">
    <div class="form-control">
      <Field type="text" name="username" placeholder="Username" rules="required" />
    </div>
    <div class="form-control">
      <Field type="text" name="account" placeholder="Telegram Username" rules="required" />
    </div>
    <div class="form-control">
      <Field type="password" name="password" placeholder="Password" rules="required" />
    </div>
    <div class="form-control">
      <button type="submit" v-bind:disabled="store.registering">Register
      </button>
    </div>
  </Form>
</template>

<script setup>
import { Form, Field, defineRule } from "vee-validate";
import { registerUser } from "@/common/auth";
import { useAuthStore } from "@/stores/auth";

const store = useAuthStore();

defineRule("required", (value) => {
  if (value) {
    return true;
  }
  return "This field is required";
});

</script>

<style scoped>
input,
button {
  background-color: transparent;
  color: var(--color-heading);
  padding: 0.8vmin;
  margin: 10px 3vmin;
  border: 1px solid var(--color-text);
  border-radius: 0.5rem;
  outline: none;
  font-size: 1.5vmin;
  transition: all 350ms ease;
  box-shadow: 0 0 12px 0 var(--color-text);
}

input:hover,
button:hover {
  border: 1px solid var(--color-heading);
  box-shadow: 0 0 0 0.1rem var(--color-heading);
}

input:focus {
  border: 1px solid var(--color-heading);
  box-shadow: 0 0 0 0.25rem var(--color-heading);
}

.register-form {
  padding-right: 1rem;
}

::placeholder {
  color: var(--color-text);
}

@media screen and (max-width: 600px) {
  input,
  button {
    font-size: 3vmin;
    border-radius: 5px;
  }
}
</style>
