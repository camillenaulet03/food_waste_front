<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <input v-model="username" placeholder="username" />
      <br />
      <br />
      <input v-model="password" placeholder="password" type="password" />
      <br />
      <br />
      <input v-model="confirmPassword" placeholder="password" type="password" />
      <br />
      <br />
      <button type="submit">Register</button>
    </form>
  </div>
  <p>Si vous avez déjà un compte <router-link to="/"><button>Login</button></router-link></p>
</template>
<script>

import { mapMutations } from "vuex";

export default {
  data: () => {
    return {
      username: "",
      password: "",
      confirmPassword: ""
    };
  },
  methods: {
    ...mapMutations(["setUser", "setToken"]),
    async register(e) {
      e.preventDefault();
      await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
          confirmPassword: this.confirmPassword,
        }),
      });
      this.$router.push("/");
    }
  }
};
</script>
