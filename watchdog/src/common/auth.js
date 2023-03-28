import { HTTP } from "@/main";
import { animateCSS } from "@/common/animation";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";

const store = useAuthStore();

function getToken(rsp) {
  store.token = rsp.data.token;
  if (store.token) {
    HTTP.defaults.headers.common["Authorization"] = "Bearer " + store.token;
    router.push("/dashboard/");
  }
}

export function login(values, actions) {
  HTTP.post("/login/", {
    username: values.username,
    password: values.password
  })
    .then((response) => {
      if (response.status === 200) {
        getToken(response);
      }
    })
    .catch(() => {
      actions.setValues({ username: "", password: "" });
      actions.setErrors({ username: "Invalid username or password" });
      alert("Invalid username or password");
      animateCSS(".login-form", "shakeX");
    });
}

export function logout() {
  store.token = null;
  router.push("/login/");
}

export const registerUser = (values, actions) => {
  store.registering = true;
  HTTP.post("/register/", {
    username: values.username,
    password: values.password,
    account: values.account
  })
    .then((response) => {
      if (response.status === 201) {
        login(values, actions);
      } else if (response.status === 401) {
        actions.setValues({ username: "", password: "", chatid: "" });
        actions.setErrors({ account: "Invalid account" });
        alert("Invalid chat id");
        animateCSS(".register-form", "shakeX");
      } else if (response.status === 402) {
        actions.setValues({ username: "", password: "", chatid: "" });
        actions.setErrors({ username: "Username already exists" });
        alert("Username already exists");
        animateCSS(".register-form", "shakeX");
      }
      store.registering = false;
    })
    .catch((e) => {
      console.log(e);
      actions.setValues({ username: "", password: "", account: "" });
      alert("Internal server error");
      store.registering = false;
      animateCSS(".register-form", "shakeX");
    });
};

export async function deleteAccount() {
  if (!confirm("Are you sure you want to delete your account?")) {
    return;
  }
  await HTTP.delete("goodbye/")
    .then((response) => {
      console.log(response);
    })
    .catch((e) => {
      console.log(e);
    });
  store.token = null;
  await router.push("/");
}
