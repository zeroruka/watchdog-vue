<template>
  <Form class="login-form" @submit="login">
    <Field type="text" name="username" placeholder="Username" class="input" rules="required" />
    <Field type="password" name="password" placeholder="Password" class="input" rules="required" />
    <button type="submit">Login</button>
  </Form>
</template>

<script setup>
import { Form, Field, defineRule } from "vee-validate";
import { login } from "@/common/auth";

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

.login-form {
  padding-left: 1rem;
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
