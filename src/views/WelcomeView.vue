<template>
  <div>
    <h1>Welcome</h1>
    <router-link to="/login"><button>Login</button></router-link>
    <router-link to="/register"><button>Register</button></router-link>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  methods: {
    async logout() {
      await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: this.getUser(),
          token: this.getToken()
        }),
      });
      this.$router.push("/");
    }
  }
};
</script>
